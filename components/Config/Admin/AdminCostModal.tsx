import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { yupResolver } from '@hookform/resolvers/yup'
import { AdminCostI, AdminCostAttributesI } from '@models/AdminCost.model'
import { adminCostService } from '@services/adminCost.service'
import { systemsService } from '@services/systems.service'
import { currencyFormatter } from '@utils/currencyFormatter'
import { Button, Label, TextInput } from 'flowbite-react'
import { useRouter } from 'next/router'
import { Fragment, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { UpdateAdministrativeCostSchema } from './UpdateAdministrativeCostSchema'

export default function AdminCostModalR({ adminCost }: { adminCost: AdminCostI }) {
  let [isOpen, setIsOpen] = useState(false)
  const closeModal = () => setIsOpen(false)
  const openModal = () => setIsOpen(true)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Partial<AdminCostAttributesI>>({
    resolver: yupResolver(UpdateAdministrativeCostSchema),
  })
  const onSubmit: SubmitHandler<Partial<AdminCostAttributesI>> = async (service) => {
    toast.promise(
      adminCostService
        .update(adminCost.id, {
          data: service,
        })
        .then(() => reset())
        .then(() => systemsService.updateSystemChange())
        .then(() => router.reload())
        .then((res) => console.log(res))
        .catch((err) => console.log(err)),
      {
        loading: 'Actualizando...',
        success: <b>¡Valor actualizado!</b>,
        error: <b>No se pudo actualizar el Valor</b>,
      },
    )
  }

  return (
    <>
      <div className='flex items-center justify-center'>
        <Button size='xs' onClick={openModal}>
          Modificar
        </Button>
      </div>

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
                  <Dialog.Title
                    as='h2'
                    className='text-lg font-medium text-center leading-6 text-gray-900 dark:text-gray-50'>
                    Valor {adminCost.attributes.title}{' '}
                    {adminCost.attributes.title !== 'profit'
                      ? currencyFormatter(adminCost.attributes.value)
                      : `${adminCost.attributes.value}%`}
                  </Dialog.Title>
                  <form className='flex justify-center flex-col' onSubmit={handleSubmit(onSubmit)}>
                    <div className='mt-2'>
                      <div>
                        <Label>Valor</Label>
                        <TextInput addon='Valor' type='number' className='my-1' {...register('value')} />
                      </div>
                    </div>
                    <p className='pt-1 text-xs text-red-500'>{errors.value?.message}</p>
                    <div className='mt-4'>
                      <Button type='submit' size='sm'>
                        Actualizar
                      </Button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
