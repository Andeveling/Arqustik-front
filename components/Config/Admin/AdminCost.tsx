import { AdminCostResponseI } from '@models/AdminCost.model'
import { currencyFormatter } from '@utils/currencyFormatter'
import AdminCostModalR from './AdminCostModal'

const AdminCost = ({ adminCost }: { adminCost: AdminCostResponseI }) => {
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
