import { QuotationResponseI } from "@models/Quotation.model"
import { currencyFormatter } from "@utils/currencyFormatter"

const QuotationFooter = ({
  quotation,
  total,
  transport_mount,
}: {
  quotation: QuotationResponseI
  total: number
  transport_mount: number
}) => {
  const {
    data: {
      attributes: { polyurethane, protection, silicone, installation },
    },
  } = quotation
  const getDescription = (item: string) => {
    if (item === "one") {
      return "Una sola cara"
    }
    if (item === "two") {
      return "Ambas caras"
    }
  }

  return (
    <section className='text-base p-2 px-4'>
      <div className='grid col-span-2'>
        <div className='grid grid-cols-2'>
          <p className='font-bold'>Subtotal</p>
          <p className='text-right'>{currencyFormatter(total)}</p>
        </div>
        <div className='grid grid-cols-2'>
          <p className='font-bold'>IVA</p>
          <p className='text-right'>{currencyFormatter(total * 0.19)}</p>
        </div>

        {transport_mount > 0 && (
          <div className='grid grid-cols-2'>
            <p className='font-bold'>Transporte</p>
            <p className='text-right'>{currencyFormatter(transport_mount)}</p>
          </div>
        )}

        <div className='grid grid-cols-2 border-t'>
          <p className='font-bold'>Total</p>
          <p className='text-right'>{currencyFormatter(total * 1.19 + transport_mount)}</p>
        </div>
      </div>
      <div className='my-2 break-after-auto break-before-auto  break-inside-avoid                              '>
        <p className='font-bold'>Forma de Pago: </p>
        <p>70% Anticipo</p>
        <p>30% Contraentrega</p>
        <p className='font-bold'>Tiempo de entrega: </p>
        <span>60 días hábiles una vez firmada acta de vanos y pago de anticipo.</span>
        <p className='font-bold'>Validez de la oferta:</p>
        <span>5 días</span>
      </div>
      <div className='mt-5 break-after-auto break-before-auto  break-inside-avoid'>
        <p className='font-bold'>Notas:</p>
        <ul className='col-span-2'>
          <li>Nuestro producto tiene garantía 5 años en acabado blanco y 6 meses en accesorios.</li>
          <li>No incluye trabajos de mampostería y pintura.</li>
          {transport_mount > 0 && <li>Incluye el transporte.</li>}
          <li>Los vidrios no tinen garantía una vez entregados en obra.</li>
          <li>
            Para el proceso de fabricación es necesario tener definido el vano con su acabado final, para ser precisos
            en las medidas del producto.
          </li>
          {installation ? (
            <li className='flex'>
              <span>Incluye instalación</span>
            </li>
          ) : (
            <li>
              <p>No incluye instalación</p>
            </li>
          )}

          {polyurethane ? (
            <li className='flex'>
              <p className='font-bold'>Poliuretano: &nbsp;&nbsp;</p> <span>{polyurethane && "Sello perimetral"}</span>
            </li>
          ) : (
            <li>
              <p>No lleva poliuretano</p>
            </li>
          )}

          {protection === "zero" ? (
            <li>
              <p>No lleva Protección</p>
            </li>
          ) : (
            <li className='flex'>
              <p className='font-bold'>Tipo de protección: &nbsp;&nbsp;</p> <span>{getDescription(protection)}</span>
            </li>
          )}
          {silicone === "zero" ? (
            <li>
              <p>No lleva silicona</p>
            </li>
          ) : (
            <li className='flex'>
              <p className='font-bold'>Tipo de Sello: &nbsp;&nbsp;</p> <span>{getDescription(silicone)}</span>
            </li>
          )}
        </ul>
      </div>
    </section>
  )
}
export default QuotationFooter
