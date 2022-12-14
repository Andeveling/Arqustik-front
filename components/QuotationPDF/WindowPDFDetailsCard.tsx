import { WindowsDatum } from '@models/WindowPVC.model'
import { currencyFormatter } from '@utils/currencyFormatter'
import { getArea, getMillimeters } from '@utils/getDimensions'
import WindowDraw from './WindowDraw'

const WindowPDFDetailsCard = ({ window }: { window: WindowsDatum }) => {
  const {
    attributes: { title, location, height, width, price, cant, model, color, description, glass },
  } = window
  return (
    <div className='grid sm:grid-cols-2 print:grid-cols-2 grid-cols-1 justify-center my-5 border-t p-4 break-after-auto break-before-auto  break-inside-avoid'>
      <div className='flex justify-center items-center'>
        <WindowDraw width={width} height={height} model={model} />
      </div>
      <div className='text-xs sm:mt-0 mt-4'>
        <div className='grid sm:grid-cols-2 grid-cols-2'>
          <p className='font-bold'>Titulo:</p> <span>{title}</span>
          <p className='font-bold'>Ubicación:</p> <span>{location}</span>
          <p className='font-bold'>Color:</p> <span className=''>{color?.toUpperCase()}</span>
          <p className='font-bold'>Despcripción:</p> <span className=''>{description}</span>
          <p className='font-bold'>Cristal:</p> <span className=''>{glass}</span>
        </div>

        <div className='py-2'>
          <p className='font-bold'>Dimensiones:</p>
          <div className='grid grid-cols-3'>
            <div className='border'>
              <div className='text-center font-bold'>Ancho</div>
              <div className='text-center border-t'>{getMillimeters(width)}</div>
            </div>
            <div className='border'>
              <div className='text-center font-bold'>Alto</div>
              <div className='text-center border-t'>{getMillimeters(height)}</div>
            </div>

            <div className='border'>
              <div className='text-center font-bold'>Area</div>
              <div className='text-center border-t'>{getArea(width, height)}</div>
            </div>
          </div>
        </div>
        <div>
          <p className='font-bold'>Detalles:</p>
          <div className='grid grid-cols-3'>
            <div className='border'>
              <div className='text-center font-bold'>Precio</div>
              <div className='text-center border-t'>{currencyFormatter(price)}</div>
            </div>
            <div className='border'>
              <div className='text-center font-bold'>Cant</div>
              <div className='text-center border-t'>{cant}</div>
            </div>

            <div className='border'>
              <div className='text-center font-bold'>Subtotal</div>
              <div className='text-center border-t'>{currencyFormatter(price * cant)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default WindowPDFDetailsCard
