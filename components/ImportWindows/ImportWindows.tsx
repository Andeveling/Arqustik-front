import { ProjectDataProps } from '@components/WindowsPVC/WindowsPVCForm'
import { ArrowUpCircleIcon } from '@heroicons/react/24/solid'
import { QuotationI } from '@models/Quotation.model'
import { getJWT } from '@services/getJWT.service'
import { windowPVC } from '@services/window.service'
import { currencyFormatter } from '@utils/currencyFormatter'
import { getGlass } from '@utils/getGlass'
import axios from 'axios'
import { Button, FileInput, Label, Table } from 'flowbite-react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

const ImportWindows = ({ projectData }: { projectData: ProjectDataProps }) => {
  const [windows, setWindows] = useState<any[]>([])
  const [loading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()
  const quotationID: QuotationI['id'] = typeof router.query.quotation === 'string' ? router.query.quotation : ''
  let total = 0
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit: SubmitHandler<any> = async (data) => {
    setIsLoading(true)
    const jwt = await getJWT()
    try {
      await axios.all(
        windows.map(({ id, ...data }) => {
          toast.promise(
            axios
              .post(`/api/windows/create`, {
                title: data.title,
                location: data.title,
                width: data.width,
                height: data.height,
                cant: data.cant,
                color: data.color,
                glass: getGlass(data.glass),
                system: data.system,
                model: data.model,
                type: data.type,
                projectData,
              })
              .then((res) =>
                windowPVC
                  .create({ quotation: quotationID, ...res.data })
                  .then(() => toast.success('Ventana creada'))
                  .then(() => router.reload())
                  .catch(() => toast.error('Algo salio mal, intenta de nuevo')),
              )
              .then(() => setIsLoading(false))
              .then(() => router.reload())
              .catch((error) => console.log(error)),
            {
              loading: 'Creando...',
              success: <b>¡Ventana creada!</b>,
              error: <b>Algo salio mal</b>,
            },
          )
        }),
      )
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className='flex items-center'>
        <div>
          <Label htmlFor='file' value='Subir un Archivo' />
          <FileInput
            id='file'
            sizing='lg'
            helperText='Adjunte un archivo json'
            required={true}
            {...(register('file'),
            {
              onChange: (e) => {
                const fileReader = new FileReader()
                if (e.target.files !== null) {
                  fileReader.readAsText(e.target.files[0], 'UTF-8')
                }
                fileReader.onload = async (e) => {
                  if (typeof fileReader.result === 'string') setWindows(JSON.parse(fileReader.result))
                }
              },
            })}
          />
        </div>

        <Button color='success' type='submit' className='-mt-1 ml-4'>
          <ArrowUpCircleIcon className='w-5 h-5 mr-2' /> {loading ? 'cargando...' : 'Subir'}
        </Button>
      </form>
      <div className='mt-4'>
        <span className='font-bold text-lg'>Ventanas a cotizar</span>
        {windows && windows.length ? (
          <>
            <Table hoverable={true} striped={true}>
              <Table.Head>
                <Table.HeadCell>Titulo</Table.HeadCell>
                <Table.HeadCell>Modelo</Table.HeadCell>
                <Table.HeadCell>Ancho</Table.HeadCell>
                <Table.HeadCell>Alto</Table.HeadCell>
                <Table.HeadCell>Precio/U</Table.HeadCell>
                <Table.HeadCell>Cantidad</Table.HeadCell>
                <Table.HeadCell className='text-right'>Subtotal</Table.HeadCell>
              </Table.Head>
              <Table.Body className='divide-y'>
                {windows.map((window, i) => {
                  const { title, width, height, price, cant, model } = window
                  total += price * cant
                  return (
                    <Table.Row key={i}>
                      <Table.Cell>{title}</Table.Cell>
                      <Table.Cell className='text-center'>{model}</Table.Cell>
                      <Table.Cell>{width} mm</Table.Cell>
                      <Table.Cell>{height} mm</Table.Cell>
                      <Table.Cell>{currencyFormatter(price)}</Table.Cell>
                      <Table.Cell>{cant} unds</Table.Cell>
                      <Table.Cell className='text-right'>{currencyFormatter(cant * price)}</Table.Cell>
                    </Table.Row>
                  )
                })}
              </Table.Body>
            </Table>
            <hr className='my-2' />
            <div className='grid grid-cols-2'>
              <p>Subtotal</p> <span className='text-right pr-6'>{currencyFormatter(total)}</span>
              <p>IVA 19%</p> <span className='text-right pr-6'>{currencyFormatter(total * 0.19)}</span>
              <p>Total</p> <span className='text-right pr-6 font-bold'>{currencyFormatter(total * 1.19)}</span>
            </div>
          </>
        ) : (
          <p>No hay ventanas para mostrar</p>
        )}
      </div>
    </>
  )
}
export default ImportWindows
