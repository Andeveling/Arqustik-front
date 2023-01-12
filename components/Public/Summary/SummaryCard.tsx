import WindowDraw from '@components/QuotationPDF/WindowDraw'
import { useCartMutations } from '@context/CartContext'
import { CartItemI } from '@models/CartItem.model'
import { currencyFormatter } from '@utils/currencyFormatter'
import { getArea, getMillimeters } from '@utils/getDimensions'
import { Button, Modal } from 'flowbite-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

const SummaryCard = ({ window }: { window: CartItemI }) => {
  const [openPopup, setOpenPopup] = useState<string | undefined>()
  const { removeFromCart } = useCartMutations()
  const deleteHandle = () => {
    toast.success('¡Producto Removido!')
    removeFromCart(window)
  }
  const { width, height, model, title, color, glass, cant, price, description } = window
  return (
    <div className='grid print:w-full print:grid-cols-2 sm:grid-cols-2 grid-cols-1 justify-center my-5 border-t p-4 break-after-auto break-before-auto  break-inside-avoid'>
      <div className='flex justify-end col-span-1 sm:col-span-2 print:col-span-2'>
        <Button className='print:hidden' size='xs' color='failure' onClick={() => setOpenPopup('default')}>
          X
        </Button>
        <Modal size='sm' popup={true} show={openPopup === 'default'} onClose={() => setOpenPopup(undefined)}>
          <Modal.Header />
          <Modal.Body>
            <div className='text-center'>
              <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
                ¿Esta seguro que desea remover la ventana?
              </h3>
            </div>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={deleteHandle}>
                Borrar
              </Button>
              <Button color='gray' onClick={() => setOpenPopup(undefined)}>
                Rechazar
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
      <div className='flex justify-center items-center'>
        <WindowDraw width={width} height={height} model={model} />
      </div>

      <div className='text-xs sm:mt-0 mt-4'>
        <div className='grid sm:grid-cols-2 grid-cols-2'>
          <p className='font-bold'>Titulo:</p> <span>{title}</span>
          <p className='font-bold'>Color:</p> <span className=''>{color?.toUpperCase()}</span>
          <p className='font-bold'>Cristal:</p> <span className=''>{glass}</span>
          <p className='font-bold'>Despcripción:</p> <span className=''>{description}</span>
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
export default SummaryCard
