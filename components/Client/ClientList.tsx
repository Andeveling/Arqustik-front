import Heading from '@components/Heading';
import { MagnifyingGlassIcon, PencilIcon, TrashIcon, DocumentIcon } from '@heroicons/react/24/outline';
import { ClientI, ResponseClientsI } from '@models/Client.model';
import { clientPVC } from '@services/client.service';
import { Button, Modal, Table } from 'flowbite-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import toast from 'react-hot-toast';
import ClientModal from './ClientModal';
import ClientModalUpdate from './ClientModalUpdate';

const ClientList = ({ clients }: { clients: ResponseClientsI }) => {
  const router = useRouter();
  const [openPopup, setOpenPopup] = useState<string | undefined>();
  const deleteHandle = (id: ClientI['id']) => {
    toast
      .promise(clientPVC.delete(id), {
        loading: 'Borrando...',
        success: <b>¡Cliente borrado!</b>,
        error: <b>Algo salio mal</b>,
      })
      .then(() => router.reload());
  };
  return (
    <div className='overflow-x-auto p-2 relative sm:rounded-lg'>
      <Heading as='h4'>Clientes</Heading>
      <div className='pb-4 flex justify-between items-center space-x-2'>
        <ClientModal />
        <label htmlFor='table-search' className='sr-only'>
          Search
        </label>
        <div className='relative mt-1 w-60'>
          <div className='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
            <MagnifyingGlassIcon className='h-5 w-5' />
          </div>
          <input
            type='text'
            id='table-search'
            className='block p-2 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='Buscar clientes'
          />
        </div>
      </div>
      <div>
        <Table hoverable={true} striped={true}>
          <Table.Head>
            <Table.HeadCell>Nombre de cliente</Table.HeadCell>
            <Table.HeadCell>Telefono</Table.HeadCell>
            <Table.HeadCell>Correo</Table.HeadCell>
            <Table.HeadCell className='text-center'>Opciones</Table.HeadCell>
          </Table.Head>
          <Table.Body className='divide-y divide-gray-400'>
            {clients &&
              clients.data.map((client) => {
                const id = client.id;
                const { fullName, cellphone, address, email } = client.attributes;
                return (
                  <Table.Row className="pl-10'" key={id}>
                    <Table.Cell className='font-bold'>{fullName}</Table.Cell>
                    <Table.Cell>{cellphone}</Table.Cell>

                    <Table.Cell>{email}</Table.Cell>
                    <Table.Cell className='flex justify-center gap-2'>
                      <Link href={`quoter/clients/${id}`}>
                        <Button size='sm' color='dark'>
                          <DocumentIcon className='w-4 h-4 mr-2' />
                          Cotizaciones
                        </Button>
                      </Link>

                      <ClientModalUpdate client={client} />

                      <Button size='sm' color='dark' onClick={() => setOpenPopup('default')}>
                        <TrashIcon className='w-4 h-4 mr-2' />
                        Borrar
                      </Button>

                      <Modal
                        size='sm'
                        popup={true}
                        show={openPopup === 'default'}
                        onClose={() => setOpenPopup(undefined)}>
                        <Modal.Header />
                        <Modal.Body>
                          <div className='text-center'>
                            <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
                              ¿Esta seguro que desea borrar?
                            </h3>
                          </div>
                          <div className='flex justify-center gap-4'>
                            <Button color='failure' onClick={() => deleteHandle(id)}>
                              Borrar
                            </Button>
                            <Button color='gray' onClick={() => setOpenPopup(undefined)}>
                              Rechazar
                            </Button>
                          </div>
                        </Modal.Body>
                      </Modal>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
          </Table.Body>
        </Table>
      </div>
      {clients.data.length === 0 && <p className='text-center mt-4'>No hay clientes, crea uno.</p>}
    </div>
  );
};
export default ClientList;
