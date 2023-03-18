import { ServicesResponseI } from '@models/Service.model';
import { currencyFormatter } from '@utils/currencyFormatter';
import ContractorModalR from './ContractorModal';

const Contractor = ({ services }: { services: ServicesResponseI }) => {
  return (
    <div className='grid grid-col- sm:grid-cols-2  gap-1'>
      {services.data.map((service) => (
        <div key={service.id} className=' pb-4 border border-gray-600'>
          <div className='grid grid-cols-2'>
            <div className='col-span-2 text-center flex justify-between pt-4 px-4'>
              <legend className='font-medium text-base'>
                {service.attributes.description && service.attributes.description.toUpperCase()}
              </legend>
              <ContractorModalR
                id={service.id}
                UOM={service.attributes.UOM}
                price={service.attributes.price}
                material={service.attributes.material}
                description={service.attributes.description}
              />
            </div>
            <div className='text-center text-lg'>Mano de obra</div>
            <div className='text-center text-lg'>Material</div>
            <div className='text-center'>
              {currencyFormatter(service.attributes.price)} * {service.attributes.UOM}
            </div>
            <div className='text-center'>
              {currencyFormatter(service.attributes.material)} * {service.attributes.UOM}
            </div>
            <div className='col-span-2 text-center my-2'>
              <p className='text-green-500'>
                Ultima Actualización: <span>{new Date(service.attributes.updatedAt).toLocaleDateString()}</span>
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Contractor;
