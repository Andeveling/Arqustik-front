import Heading from '@components/Heading'
import LoadingSpinner from '@components/LoadingSpinner'
import QuotationBodyPDF from '@components/QuotationPDF/QuotationBodyPDF'
import QuotationHeaderPDF from '@components/QuotationPDF/QuotationHeaderPDF'
import { QuotationResponseI } from '@models/Quotation.model'
import { fetcher } from '@services/fetcher.service'
import { arqustikConfig, endpoints } from 'arqustik.config'
import { Button } from 'flowbite-react'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import useSWR from 'swr'
import { PrinterIcon, ArrowLeftIcon } from '@heroicons/react/24/solid'

const { STRAPI_SERVER } = arqustikConfig
const { quotations } = endpoints

export default function Pdf() {
  const [client, setClient] = useState(false)
  useEffect(() => setClient(true), [])
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })
  const router = useRouter()
  const componentRef = useRef(null)
  const { data: quotation, error } = useSWR<QuotationResponseI>(
    `${STRAPI_SERVER}${quotations}/${router.query.quotation}?populate=*`,
    fetcher,
  )

  if (!quotation) return <LoadingSpinner />
  if (error) return <p>{error.message}</p>

  return (
    <div
      ref={componentRef}
      style={{
        width: '100%',
        height: window.innerHeight,
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column',
      }}>
      <div className='flex gap-4 m-4'>
        <Button size='xl' className='print:hidden w-1/2' onClick={handlePrint}>
          <PrinterIcon className='w-6 h-6 mr-4' />
          <span>Imprimir</span>
        </Button>
        <Button size='xl' className='print:hidden w-1/2' color='failure' onClick={router.back}>
          <ArrowLeftIcon className='w-6 h-6 mr-4' /> <span>Atras</span>
        </Button>
      </div>
      <div className='max-w-7xl mx-auto '>
        {/* ENCABEZADO */}
        <QuotationHeaderPDF quotation={quotation} />
        {/* PARRAFO */}
        <div className='text-base print:text-xs px-2'>
          <p className='text-justify'>
            De acuerdo a sus indicaciones, le presentamos la oferta de productos que solicitó. Agradecemos la confianza
            depositada en nuestra compañía y le invitamos a leer el contenido de esta propuesta. Quedamos a su
            disposición para aclarar cualquier inquietud y a la espera de una respuesta positiva que nos convierta en su
            aliado en el proceso.
          </p>
        </div>
        {/* PRODUCTOS */}
        <div className='text-center my-4'>
          <Heading as='h3'>Lista ventanas {quotation.data.attributes.project}</Heading>
        </div>
        <QuotationBodyPDF
          quotation={quotation}
          windows={quotation.data.attributes.windows.data}
          transport_mount={quotation.data.attributes.transport_mount ?? 0}
        />
      </div>
    </div>
  )
}
