import Heading from '@components/Heading'
import { DocumentIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid'
import { ClientByIDResponse, QuotationI } from '@models/Quotation.model'
import { quotationPVC } from '@services/quotation.service'
import { Button, Modal, Table } from 'flowbite-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import toast from 'react-hot-toast'
import QuotationModal from './Quotation/QuotationModal'
import QuotationUpdateModal from './Quotation/QuotationUpdateModal'

const ClientQuotations = ({ client }: { client: ClientByIDResponse }) => {
  const router = useRouter()
  const [openModal, setOpenModal] = useState<string | undefined>()
  const deleteHandle = (id: QuotationI['id']) => {
    toast
      .promise(quotationPVC.delete(id), {
        loading: 'Borrando...',
        success: <b>¡Cotización borrada!</b>,
        error: <b>Algo salio mal</b>,
      })
      .then(() => router.reload())
  }

  return (
    <>
      <Heading as='h3'>{client && client.data.attributes.fullName}</Heading>
      <div className='flex justify-between'>
        <Heading as='h4'>Cotizaciones</Heading>
        <QuotationModal />
      </div>
      <Table hoverable={true} striped={true}>
        <Table.Head>
          <Table.HeadCell>ID Arqustik</Table.HeadCell>
          <Table.HeadCell>Obra</Table.HeadCell>
          <Table.HeadCell> Direccion</Table.HeadCell>
          <Table.HeadCell> Fecha</Table.HeadCell>
          <Table.HeadCell className='text-center'>Opciones</Table.HeadCell>
        </Table.Head>
        <Table.Body className='divide-y divide-gray-400 pl-10'>
          {client &&
            client.data.attributes.quotations.data
              ?.map((quote) => {
                const { arqustik_id, project, address, createdAt } = quote.attributes
                return (
                  <Table.Row key={quote.id}>
                    <Table.Cell className='font-bold'>{arqustik_id}</Table.Cell>
                    <Table.Cell>{project}</Table.Cell>
                    <Table.Cell>{address}</Table.Cell>
                    <Table.Cell>{new Date(createdAt).toLocaleDateString()}</Table.Cell>
                    <Table.Cell className='flex justify-center gap-2'>
                      <Link href={`${client.data.id}/quotation/${quote.id}`}>
                        <Button size='sm' color='dark'>
                          <DocumentIcon className='w-4 h-4 mr-2' />
                          Ventanas
                        </Button>
                      </Link>
                      <QuotationUpdateModal quotation={quote} />
                      <Button size='sm' color='dark' onClick={() => setOpenModal('default')}>
                        <TrashIcon className='w-4 h-4 mr-2' />
                        Borrar
                      </Button>

                      <Modal
                        size='sm'
                        popup={true}
                        show={openModal === 'default'}
                        onClose={() => setOpenModal(undefined)}>
                        <Modal.Header />
                        <Modal.Body>
                          <div className='text-center'>
                            <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
                              ¿Esta seguro que desea borrar?
                            </h3>
                          </div>
                          <div className='flex justify-center gap-4'>
                            <Button color='failure' onClick={() => deleteHandle(quote.id)}>
                              Borrar
                            </Button>
                            <Button color='gray' onClick={() => setOpenModal(undefined)}>
                              Rechazar
                            </Button>
                          </div>
                        </Modal.Body>
                      </Modal>
                    </Table.Cell>
                  </Table.Row>
                )
              })
              .reverse()}
        </Table.Body>
      </Table>

      {client.data.attributes.quotations.data.length === 0 && (
        <p className='text-center mt-4'>No hay cotizaciones, crea una.</p>
      )}
    </>
  )
}
export default ClientQuotations
