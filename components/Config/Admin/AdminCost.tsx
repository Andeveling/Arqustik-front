import { yupResolver } from '@hookform/resolvers/yup'
import { AdminCostI, AdminCostIAttributesI, AdminCostResponseI } from '@models/AdminCost.model'
import { adminCostService } from '@services/adminCost.service'
import { currencyFormatter } from '@utils/currencyFormatter'
import { Button, Label, TextInput } from 'flowbite-react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { UpdateAdministrativeCostSchema } from './UpdateAdministrativeCostSchema'
import AdminCostModalR from './AdminCostModal'

const AdminCost = ({ adminCost }: { adminCost: AdminCostResponseI }) => {
  const dollar = adminCost.data.find((item) => item.attributes.title === 'dollar')
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Partial<AdminCostI>>({
    resolver: yupResolver(UpdateAdministrativeCostSchema),
  })

  const onSubmit: SubmitHandler<Partial<AdminCostIAttributesI>> = async (adminCost) => {
    /*   toast.promise(
      adminCostService
        .update(id, {
          data: {
            value: adminCost?.value,
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
    ) */
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4'>
      {adminCost.data.map((cost) => {
        return (
          <div key={cost.id}>
            <div className='flex items-center space-x-2'>
              <legend className='font-medium text-xl'>{cost.attributes.title}</legend>
              <div className='text-center'>
                <span className='font-medium text-xl'>{currencyFormatter(cost.attributes.value)}</span>
              </div>
              <AdminCostModalR dollar={dollar?.attributes.value ?? 0} adminCost={cost} />
            </div>
            <div className=''>
              <p className='text-green-500'>
                Ultima Actualización: <span>{new Date(cost.attributes.updatedAt).toLocaleDateString()}</span>
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
export default AdminCost
