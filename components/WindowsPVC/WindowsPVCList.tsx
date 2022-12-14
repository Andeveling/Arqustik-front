import ModalEdit from '@components/ModalEdit'
import { TrashIcon } from '@heroicons/react/24/solid'
import { WindowI, WindowsQuotationResponseI } from '@models/WindowPVC.model'
import { windowPVC } from '@services/window.service'
import { Button, Dropdown, Modal, Table } from 'flowbite-react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { currencyFormatter } from 'utils/currencyFormatter'
import { ProjectDataProps } from './WindowsPVCForm'
import WindowsPVCUpdateForm from './WindowsPVCUpdateForm'

const WindowsPVCList = ({
  windows,
  projectData,
  transport_mount,
}: {
  windows: WindowsQuotationResponseI
  projectData: ProjectDataProps
  transport_mount: number
}) => {
  const [openModal, setOpenModal] = useState<string | undefined>()
  let total = 0
  const router = useRouter()
  const deleteHandle = async (id: WindowI['id']) => {
    toast
      .promise(windowPVC.delete(id), {
        loading: 'Borrando...',
        success: <b>¡Ventana borrada!</b>,
        error: <b>Algo salio mal</b>,
      })
      .then(() => router.reload())
  }

  return (
    <div className='mt-2'>
      <hr className='my-2' />
      <p className='font-bold'>Ventanas</p>
      {windows && windows.data.length ? (
        <Table hoverable={true} striped={true}>
          <Table.Head>
            <Table.HeadCell>Titulo</Table.HeadCell>
            <Table.HeadCell>Modelo</Table.HeadCell>
            <Table.HeadCell>Ancho</Table.HeadCell>
            <Table.HeadCell>Alto</Table.HeadCell>
            <Table.HeadCell>Precio/U</Table.HeadCell>
            <Table.HeadCell>Cantidad</Table.HeadCell>
            <Table.HeadCell>Editar</Table.HeadCell>
            <Table.HeadCell className='text-right'>Subtotal</Table.HeadCell>
          </Table.Head>
          <Table.Body className='divide-y'>
            {windows.data.map((window) => {
              const {
                attributes: { title, width, height, price, cant, model },
              } = window
              total += price * cant
              return (
                <Table.Row key={window.id}>
                  <Table.Cell>{title}</Table.Cell>
                  <Table.Cell className='text-center'>{model}</Table.Cell>
                  <Table.Cell>{width} mm</Table.Cell>
                  <Table.Cell>{height} mm</Table.Cell>
                  <Table.Cell>{currencyFormatter(price)}</Table.Cell>
                  <Table.Cell>{cant} unds</Table.Cell>
                  <Table.Cell>
                    <Dropdown label='Opciones' color='dark' size='xs' placement='left' arrowIcon={false}>
                      <Dropdown.Item>
                        <ModalEdit
                          title='Edita esta ventana'
                          form={<WindowsPVCUpdateForm windowID={window.id} projectData={projectData} />}
                        />
                      </Dropdown.Item>
                      <Dropdown.Item className='m-0 p-0'>
                        <Button size='xs' color='failure' onClick={() => setOpenModal('default')}>
                          <TrashIcon className='w-4 h-4 mr-2' />
                          <span>Borrar</span>
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
                              <Button color='failure' onClick={() => deleteHandle(window.id)}>
                                Borrar
                              </Button>
                              <Button color='gray' onClick={() => setOpenModal(undefined)}>
                                Rechazar
                              </Button>
                            </div>
                          </Modal.Body>
                        </Modal>
                      </Dropdown.Item>
                    </Dropdown>
                  </Table.Cell>
                  <Table.Cell className='text-right'>{currencyFormatter(cant * price)}</Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table>
      ) : (
        <p>No hay ventanas para mostrar</p>
      )}
      <hr className='my-2' />
      <div className='grid grid-cols-2'>
        <p>Subtotal</p> <span className='text-right pr-6'>{currencyFormatter(total)}</span>
        <p>IVA 19%</p> <span className='text-right pr-6'>{currencyFormatter(total * 0.19)}</span>
        <p>Transporte</p> <span className='text-right pr-6'>{currencyFormatter(transport_mount)}</span>
        <p>Total</p>{' '}
        <span className='text-right pr-6 font-bold'>{currencyFormatter(total * 1.19 + transport_mount)}</span>
      </div>
    </div>
  )
}
export default WindowsPVCList
