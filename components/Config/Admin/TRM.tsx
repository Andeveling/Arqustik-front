import { yupResolver } from '@hookform/resolvers/yup'
import { AdminCostI, AdminCostIAttributesI } from '@models/AdminCost.model'
import { currencyFormatter } from '@utils/currencyFormatter'
import { Button, Label, TextInput } from 'flowbite-react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { UpdateAdministrativeCostSchema } from './UpdateAdministrativeCostSchema'
import toast from 'react-hot-toast'
import { adminCostService } from '@services/adminCost.service'

const TRM = ({ dollar }: { dollar: AdminCostI }) => {
  let [isOpen, setIsOpen] = useState(false)
  const closeModal = () => setIsOpen(false)
  const openModal = () => setIsOpen(true)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Partial<AdminCostIAttributesI>>({
    resolver: yupResolver(UpdateAdministrativeCostSchema),
  })

  const onSubmit: SubmitHandler<Partial<AdminCostIAttributesI>> = async (adminCost) => {
    toast.promise(
      adminCostService
        .update(dollar.id, {
          data: {
            value: adminCost.value,
          },
        })
        .then(() => reset())
        .then(() => {})
        .catch((err) => console.log(err)),
      {
        loading: 'Actualizando...',
        success: <b>¡Valor actualizado!</b>,
        error: <b>No se pudo actualizar el Valor</b>,
      },
    )
  }

  return (
    <div>
      <form className='flex justify-center' onSubmit={handleSubmit(onSubmit)}>
        <div className='grid grid-cols-2 max-w-sm'>
          <Label className='col-span-2'>TRM: {currencyFormatter(dollar?.attributes.value ?? 0)}</Label>
          <div className='grid place-content-center'>
            <TextInput type='number' addon='Valor Dolar' {...register('value')} />
          </div>
          <div className='grid place-content-center'>
            <Button type='submit' color='success'>
              Actualizar{' '}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
export default TRM
