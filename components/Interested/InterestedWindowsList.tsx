import { InterestedI, InterestedWindowI } from '@models/Interested.model'
import { currencyFormatter } from '@utils/currencyFormatter'
import { Button, Modal, Table } from 'flowbite-react'
import { ArrowDownCircleIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

const InterestedWindowsList = ({
  client,
  windows,
}: {
  windows: InterestedWindowI[]
  client: InterestedI['fullName']
}) => {
  let total = 0
  const [openPopup, setOpenPopup] = useState<string | undefined>()

  const exportData = () => {
    setOpenPopup(undefined)
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(JSON.stringify(windows))}`
    const link = document.createElement('a')
    link.href = jsonString
    link.download = `Ventanas ${client}.json`
    link.click()
    toast.success('Ventanas descargadas')
  }
  return (
    <div>
      <div className='flex justify-end mb-2'>
        <Button color='dark' onClick={() => setOpenPopup('default')}>
          <ArrowDownCircleIcon className='w-5 h-5 mr-2' />
          Exportar
        </Button>
        <Modal size='sm' popup={true} show={openPopup === 'default'} onClose={() => setOpenPopup(undefined)}>
          <Modal.Header />
          <Modal.Body>
            <div className='text-center'>
              <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>¿Desea hacer una copia?</h3>
            </div>
            <div className='flex justify-center gap-4'>
              <Button color='success' onClick={exportData}>
                Descargar
              </Button>
              <Button color='gray' onClick={() => setOpenPopup(undefined)}>
                Cancelar
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
      {windows ? (
        <div>
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
              {windows.map(({ id, title, width, height, price, cant, model }) => {
                total += price * cant
                return (
                  <Table.Row key={id}>
                    <Table.Cell>{title}</Table.Cell>
                    <Table.Cell>{model}</Table.Cell>
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
          <div className='mt-4 text-lg px-2'>
            <div className='flex justify-between '>
              <span>Subtotal:</span>
              <span>{currencyFormatter(total)}</span>
            </div>
            <div className='flex justify-between '>
              <span>IVA:</span>
              <span>{currencyFormatter(total * 0.19)}</span>
            </div>
            <div className='flex justify-between '>
              <span>Total:</span>
              <span>{currencyFormatter(total * 1.19)}</span>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
export default InterestedWindowsList
