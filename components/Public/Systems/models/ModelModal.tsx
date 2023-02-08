import { ProjectDataProps } from '@components/WindowsPVC/WindowsPVCForm'
import { useCartMutations } from '@context/CartContext'
import { Dialog, Transition } from '@headlessui/react'
import { ArrowsRightLeftIcon, ArrowsUpDownIcon, ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { yupResolver } from '@hookform/resolvers/yup'
import { WindowDoor, WindowsModelResponseI } from '@models/WindowModels.model'
import { WindowModelsEnum } from '@models/WindowPVC.model'
import axios from 'axios'
import { Button, Label, Select, TextInput } from 'flowbite-react'
import { useRouter } from 'next/router'
import { Fragment, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as yup from 'yup'
import { v4 as uuidv4 } from 'uuid'

interface CreateWindowPublicI {
  id: number | string
  title: string
  type: WindowDoor
  model: WindowModelsEnum
  width: number
  height: number
  system: string
  cant: number
  glass: string
  color: string
  hours: number
  projectData: ProjectDataProps
}

const ModelModal = ({ model }: { model: WindowsModelResponseI }) => {
  const router = useRouter()
  const systemName = router.query?.systems
  let [isOpen, setIsOpen] = useState(false)
  const closeModal = () => setIsOpen(false)
  const openModal = () => setIsOpen(true)
  const { addToCart } = useCartMutations()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const CreateModelWindowSchema = yup.object().shape({
    title: yup.string().required('Este campo es requerido'),
    width: yup
      .number()
      .min(model.attributes.minW)
      .max(model.attributes.maxW)
      .required('Este campo es requerido')
      .typeError('El valor debe ser un numero'),
    height: yup
      .number()
      .min(model.attributes.minH)
      .max(model.attributes.maxH)
      .required('Este campo es requerido')
      .typeError('El valor debe ser un numero'),
    cant: yup
      .number()
      .min(1, 'La cantidad minima debe ser 1')
      .positive()
      .required()
      .typeError('El valor debe ser un numero'),
  })
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateWindowPublicI>({
    resolver: yupResolver(CreateModelWindowSchema),
    defaultValues: {
      id: model.id,
      hours: model.attributes.hours,
      system: systemName as string,
      model: model.attributes.opening,
      type: model.attributes.windowdoor,
      cant: 1,
      projectData: {
        installation: false,
        polyurethane: false,
        transport: false,
        protection: 'zero',
        silicone: 'zero',
      },
    },
  })

  const onSubmit: SubmitHandler<CreateWindowPublicI> = async (data) => {
    setIsLoading(true)
    toast.promise(
      axios
        .post(`/api/windows/create`, data)
        .then((res) => addToCart({ id: uuidv4(), ...res.data }))
        .then(() => closeModal())
        .then(() => setIsLoading(false))
        .catch((error) => console.log(error)),
      {
        loading: 'Creando...',
        success: <b>¡Ventana creada!</b>,
        error: <b>Algo salio mal</b>,
      },
    )
  }

  return (
    <div>
      <Button onClick={openModal} size='xs' color='dark'>
        <ShoppingCartIcon className='w-4 h-4 mr-2' /> Añadir
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
                  <div className='flex justify-end mb-2'>
                    <button
                      type='button'
                      className='inline-flex justify-center rounded-md border border-transparent bg-transparent px-4 py-2 text-sm font-medium text-red-500 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                      onClick={closeModal}>
                      <XMarkIcon className='h-8 w-8 font-bold' />
                    </button>
                  </div>

                  <form className='flex justify-center flex-col' onSubmit={handleSubmit(onSubmit)}>
                    <div>
                      <legend className='text-xl'>Detalles de la ventana</legend>
                      <div className='mb-2'>
                        <Label htmlFor='title'>Referencia</Label>
                        <TextInput
                          id='title'
                          addon='Referencia'
                          {...register('title')}
                          placeholder={'Ejemplo: V1, V2, V3'}
                        />
                        {errors.title?.message ? <p className='text-xs text-red-500'>{errors.title.message}</p> : <></>}
                      </div>
                      <div className='mb-2'>
                        <Label htmlFor='width'>Ancho mm</Label>
                        <TextInput
                          id='width'
                          icon={ArrowsRightLeftIcon}
                          addon='mm'
                          type='number'
                          {...register('width')}
                          placeholder={`${model.attributes.minW} - ${model.attributes.maxW}`}
                        />
                        {errors.width?.message ? <p className='text-xs text-red-500'>{errors.width.message}</p> : <></>}
                      </div>
                      <div className='mb-2'>
                        <Label htmlFor='height'>Alto mm</Label>
                        <TextInput
                          id='height'
                          icon={ArrowsUpDownIcon}
                          addon='mm'
                          type='number'
                          {...register('height')}
                          placeholder={`${model.attributes.minH} - ${model.attributes.maxH}`}
                        />
                        {errors.height?.message ? (
                          <p className='text-xs text-red-500'>{errors.height.message}</p>
                        ) : (
                          <></>
                        )}
                      </div>

                      <div className='mb-2'>
                        <Label htmlFor='select-glass'>Seleccionar Cristal</Label>
                        <Select id='select-glass' addon='Vidrio' {...register('glass')}>
                          {/* llamar vidrios disponibles */}
                          <option value='4mmCI'>4mm simple</option>
                          <option value='5mmTI'>5mm templado</option>
                          <option value='8mmLI'>8mm laminado</option>
                        </Select>
                      </div>
                      <div className='mb-2'>
                        <Label id='select-color-pvc' htmlFor='color'>
                          Color PVC
                        </Label>
                        <Select id='select-color-pvc' addon='color' {...register('color')}>
                          <option value='blanco'>blanco</option>
                        </Select>
                      </div>

                      <div className='mb-2'>
                        <Label htmlFor='height'>Cant</Label>
                        <TextInput id='height' addon='cant' type='number' {...register('cant')} placeholder='1-10' />
                        {errors.cant?.message ? <p className='text-xs text-red-500'>{errors.cant.message}</p> : <></>}
                      </div>
                    </div>
                    <Button color='dark' type='submit' className='mt-2' disabled={isLoading}>
                      <ShoppingCartIcon className='w-4 h-4 mr-2' />
                      {isLoading ? <>Procesando..</> : <>Añadir</>}
                    </Button>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}
export default ModelModal

/* 
 Response Example
data: 
cant: 1
color: "blanco"
cost:564033.3317192697
description:"Ventana Europea BELLA-SLIDING"
glass:"Templado 5mm"
height:1200
model:"OX"
price:867743.587260415
profit:303710.2555411452
title:"V1"
width:1200
*/
