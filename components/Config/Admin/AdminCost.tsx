import { yupResolver } from '@hookform/resolvers/yup'
import { AdminCostI, AdminCostIAttributesI, AdminCostResponseI } from '@models/AdminCost.model'
import { currencyFormatter } from '@utils/currencyFormatter'
import { SubmitHandler, useForm } from 'react-hook-form'
import AdminCostModalR from './AdminCostModal'
import { UpdateAdministrativeCostSchema } from './UpdateAdministrativeCostSchema'

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
    <div className='grid grid-cols-1 gap-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4'>
      {adminCost.data.map((cost) => {
        if (cost.attributes.title !== 'profit') {
          return (
            <div key={cost.id} className='p-4 border border-gray-600'>
              <div className='flex items-center justify-between space-x-2'>
                <legend className='font-medium text-xl'>{cost.attributes.title.toUpperCase()}</legend>
                <div className='text-center'>
                  <span className='font-medium text-xl'>{currencyFormatter(cost.attributes.value)}</span>
                </div>
                <AdminCostModalR adminCost={cost} />
              </div>
              <div className=''>
                <p className='text-green-500'>
                  Ultima Actualización: <span>{new Date(cost.attributes.updatedAt).toLocaleDateString()}</span>
                </p>
              </div>
            </div>
          )
        } else {
          return (
            <div key={cost.id} className='p-2 border border-gray-600'>
              <div className='flex items-center justify-between space-x-2'>
                <legend className='font-medium text-xl'>{cost.attributes.title.toUpperCase()}</legend>
                <div className='text-center'>
                  <span className='font-medium text-xl'>{cost.attributes.value} %</span>
                </div>
                <AdminCostModalR adminCost={cost} />
              </div>
              <div className=''>
                <p className='text-green-500'>
                  Ultima Actualización: <span>{new Date(cost.attributes.updatedAt).toLocaleDateString()}</span>
                </p>
              </div>
            </div>
          )
        }
      })}
    </div>
  )
}
export default AdminCost
