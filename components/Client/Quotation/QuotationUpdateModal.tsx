import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon, PlusIcon, PencilIcon } from '@heroicons/react/24/outline'
import { QuotationI } from '@models/Quotation.model'
import { Button } from 'flowbite-react'
import { Fragment, useState } from 'react'
import QuotationForm from './QuotationForm'
import QuotationUpdateForm from './QuotationUpdateForm'

export default function QuotationUpdateModal({ quotation }: { quotation: QuotationI }) {
  let [isOpen, setIsOpen] = useState(false)
  const closeModal = () => setIsOpen(false)
  const openModal = () => setIsOpen(true)

  return (
    <>
      <Button size='sm' color='dark' onClick={openModal}>
        <PencilIcon className='w-4 h-4 mr-2' />
        Editar
      </Button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={() => {}}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'>
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'>
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-black p-6 text-left align-middle shadow-xl transition-all'>
                  <div className='mt-4 flex justify-end'>
                    <button
                      type='button'
                      className='inline-flex justify-center rounded-md border border-transparent bg-transparent px-4 py-2 text-sm font-medium text-red-500 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                      onClick={closeModal}>
                      <XMarkIcon className='h-8 w-8 font-bold' />
                    </button>
                  </div>
                  <Dialog.Title as='h2' className='text-lg font-medium leading-6 text-gray-900 dark:text-gray-50'>
                    Actualizar cotización
                  </Dialog.Title>
                  <div className='mt-2'>
                    <QuotationUpdateForm quotation={quotation} />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
