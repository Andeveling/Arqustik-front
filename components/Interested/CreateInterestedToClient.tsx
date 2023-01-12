import { DocumentIcon } from '@heroicons/react/24/solid'
import { InterestedResponseI } from '@models/Interested.model'
import { clientPVC } from '@services/client.service'
import { Button, Modal } from 'flowbite-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

const CreateInterestedToClient = ({ interested }: { interested: InterestedResponseI }) => {
  const [openPopup, setOpenPopup] = useState<string | undefined>()

  const createClientHandle = () => {
    toast.promise(
      clientPVC
        .create({
          data: {
            fullName: interested.attributes.fullName,
            cellphone: interested.attributes.cellphone,
            email: interested.attributes.email,
            address: interested.attributes.address,
          },
        })
        .then((res) => {})
        .then((res) => console.log(res))
        .then(() => setOpenPopup(undefined)),
      {
        loading: 'Creando Cliente...',
        success: <b>¡Cliente creado!</b>,
        error: <b>Algo salio mal</b>,
      },
    )
  }

  return (
    <>
      <Button size='sm' color='dark' onClick={() => setOpenPopup('default')}>
        <DocumentIcon className='w-4 h-4 mr-2' />
        Crear Cliente
      </Button>

      <Modal size='sm' popup={true} show={openPopup === 'default'} onClose={() => setOpenPopup(undefined)}>
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
              ¿Esta seguro que desea crear un cliente a partir de este interesado?
            </h3>
          </div>
          <div className='flex justify-center gap-4'>
            <Button color='success' onClick={createClientHandle}>
              Crear
            </Button>
            <Button color='gray' onClick={() => setOpenPopup(undefined)}>
              Atras
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
export default CreateInterestedToClient
function setOpenPopup(undefined: undefined): any {
  throw new Error('Function not implemented.')
}
