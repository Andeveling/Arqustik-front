import LoadingSpinner from "@components/LoadingSpinner"
import QuotationBodyPDF from "@components/QuotationPDF/QuotationBodyPDF"
import QuotationHeaderPDF from "@components/QuotationPDF/QuotationHeaderPDF"
import { QuotationResponseI } from "@models/Quotation.model"
import { fetcher } from "@services/fetcher.service"
import { arqustikConfig, endpoints } from "arqustik.config"
import { Button } from "flowbite-react"
import { useRouter } from "next/router"
import { useRef } from "react"
import { useEffect, useState } from "react"
import useSWR from "swr"
import { useReactToPrint } from "react-to-print"
import QuotationFooter from "@components/QuotationPDF/QuotationFooter"
import Heading from "@components/Heading"

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
    fetcher
  )

  if (!quotation) return <LoadingSpinner />
  if (error) return <p>{error.message}</p>

  return (
    <div
      ref={componentRef}
      style={{
        width: "100%",
        height: window.innerHeight,
        overflow: "visible",
        display: "flex",
        flexDirection: "column",
      }}>
      <Button className='print:hidden' color='dark' onClick={handlePrint}>
        Print
      </Button>
      <div className='max-w-7xl mx-auto'>
        {/* ENCABEZADO */}
        <QuotationHeaderPDF quotation={quotation} />
        {/* PARRAFO */}
        <div className='text-base print:text-xs'>
          <p className='text-justify'>
            De acuerdo a sus indicaciones, le presentamos la oferta que solicitó; suministro, instalación y transporte
            de ventanas en PVC color blanco. Agradecemos la confianza depositada en nuestra compañía y le invitamos a
            leer el contenido de esta propuesta. Quedamos a su disposición para aclarar cualquier inquietud y a la
            espera de una respuesta positiva que nos convierta en su aliado en el proceso.
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
