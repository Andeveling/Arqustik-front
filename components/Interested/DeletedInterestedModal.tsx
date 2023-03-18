import Heading from '@components/Heading';
import { DocumentIcon, TrashIcon } from '@heroicons/react/24/solid';
import { InterestedI, InterestedsResponseI } from '@models/Interested.model';
import { interestedPVC } from '@services/interested.service';
import { Button, Modal, Table } from 'flowbite-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import toast from 'react-hot-toast';

const DeletedInterestedModal = ({ id }: { id: InterestedI['id'] }) => {
  const [openPopup, setOpenPopup] = useState<string | undefined>();
  const router = useRouter();

  const deleteHandle = (id: InterestedI['id']) => {
    toast.promise(
      interestedPVC.delete(id).then((res) => {
        console.log(res);
        setOpenPopup(undefined);
        router.reload();
      }),

      {
        loading: 'Borrando...',
        success: <b>¡Interesado borrado!</b>,
        error: <b>Algo salio mal</b>,
      },
    );
  };
  return (
    <>
      <Button size='sm' color='dark' onClick={() => setOpenPopup('default')}>
        <TrashIcon className='w-4 h-4 mr-2' />
        Borrar
      </Button>

      <Modal size='sm' popup={true} show={openPopup === 'default'} onClose={() => setOpenPopup(undefined)}>
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
    </>
  );
};
export default DeletedInterestedModal;
