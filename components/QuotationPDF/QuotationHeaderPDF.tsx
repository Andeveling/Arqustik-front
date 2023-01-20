import { QuotationResponseI } from '@models/Quotation.model'
import logo from '@public/img/logo.png'
import Image from 'next/image'

const QuotationHeaderPDF = ({ quotation }: { quotation: QuotationResponseI }) => {
  const {
    data: {
      attributes: { protection, client, silicone, polyurethane },
    },
  } = quotation

  return (
    <header className='px-2'>
      <div className='flex justify-between'>
        <div>
          <Image width={200} src={logo} alt={''} />
        </div>
        <div>
          <p>{new Date(client.data.attributes.publishedAt).toLocaleDateString()}</p>
        </div>
      </div>
      <hr className='my-4' />
      <div className='grid grid-cols-2 my-4'>
        <div className='col-span-2'>
          <div className='text-lg flex '>
            <p className='font-bold'>Cliente: &nbsp;&nbsp;</p> <span> {client.data.attributes.fullName}</span>
          </div>
          <div className='text-lg flex '>
            <p className='font-bold'>Dirección:&nbsp;&nbsp; </p> <span> {client.data.attributes.address}</span>
          </div>
          <div className='text-lg flex '>
            <p className='font-bold'>email:&nbsp;&nbsp; </p> <span> {client.data.attributes.email}</span>
          </div>
          <div className='text-lg flex '>
            <p className='font-bold'>Celular: &nbsp;&nbsp;</p> <span> {client.data.attributes.cellphone}</span>
          </div>
        </div>
      </div>
    </header>
  )
}
export default QuotationHeaderPDF
