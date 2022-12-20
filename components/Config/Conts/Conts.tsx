import { AdminCostIAttributesI } from '@models/AdminCost.model'
import { ServicesResponseI } from '@models/Service.model'
import { currencyFormatter } from '@utils/currencyFormatter'
import ContsModalR from './ContsModal'

const Conts = ({ dollar, services }: { dollar: AdminCostIAttributesI['value']; services: ServicesResponseI }) => {
  return (
    <div className='grid gap-2'>
      {services.data.map((service) => (
        <div key={service.id} className='mb-4 pb-4 border-b '>
          <div className='grid grid-cols-2'>
            <div className='col-span-2 text-center'>
              <legend className='font-medium text-xl'>{service.attributes.description}</legend>
            </div>
            <div className='text-center text-lg'>Mano de obra</div>
            <div className='text-center text-lg'>Material</div>
            <div className='text-center'>
              {currencyFormatter(service.attributes.price * dollar)} * {service.attributes.UOM}
            </div>
            <div className='text-center'>
              {currencyFormatter(service.attributes.material * dollar)} * {service.attributes.UOM}
            </div>
            <div className='col-span-2 text-center my-2'>
              <p className='text-green-500'>
                Ultima Actualización: <span>{new Date(service.attributes.updatedAt).toLocaleDateString()}</span>
              </p>
            </div>
            <div className='grid place-content-center col-span-2 mt-4'>
              <ContsModalR
                id={service.id}
                UOM={service.attributes.UOM}
                dollar={dollar}
                price={service.attributes.price}
                material={service.attributes.material}
                description={service.attributes.description}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
export default Conts
