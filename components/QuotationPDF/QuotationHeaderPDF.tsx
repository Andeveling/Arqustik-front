import Heading from "@components/Heading"
import { QuotationResponseI } from "@models/Quotation.model"
import { ClientQuotationResponseI } from "@models/WindowPVC.model"

const QuotationHeaderPDF = ({ quotation }: { quotation: QuotationResponseI }) => {
  const {
    data: {
      attributes: { protection, client, silicone, polyurethane },
    },
  } = quotation

  return (
    <header>
      <div className='flex justify-between'>
        <div>
          <Heading>Arqustik</Heading>
        </div>
        <div>
          <p>{new Date(client.data.attributes.publishedAt).toLocaleDateString()}</p>
        </div>
      </div>

      <div className='grid grid-cols-2 my-4'>
        <div className='col-span-1'>
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
