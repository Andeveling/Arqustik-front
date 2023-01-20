import { QuotationResponseI } from '@models/Quotation.model'
import { currencyFormatter } from '@utils/currencyFormatter'

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
    if (item === 'one') {
      return 'Una sola cara'
    }
    if (item === 'two') {
      return 'Ambas caras'
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
        <p>70% Anticipo.</p>
        <p>30% Avance de Obra.</p>
        <p className='font-bold'>Tiempo de entrega: </p>
        <span>
          A partir de 45 Días hábiles después de realizado el anticipo y enviadas las medidas definitivas de fabricación
          (acta de vanos)
        </span>
        <p className='font-bold'>Validez de la oferta:</p>
        <span>5 días</span>
      </div>
      <div className='mt-5 break-after-auto break-before-auto  break-inside-avoid'>
        <p className='font-bold'>Notas:</p>
        <ul className='col-span-2'>
          <li>Nuestro producto tiene garantía 10 años en acabado blanco y 6 meses en accesorios.</li>
          <li>No incluye trabajos de mampostería y pintura.</li>
          {transport_mount > 0 ? <li>Incluye el transporte.</li> : <li>No incluye el transporte.</li>}

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
              <p className='font-bold'>Poliuretano: &nbsp;&nbsp;</p> <span>{polyurethane && 'Sello perimetral'}</span>
            </li>
          ) : (
            <li>
              <p>No lleva poliuretano</p>
            </li>
          )}

          {protection === 'zero' ? (
            <li>
              <p>No lleva Protección</p>
            </li>
          ) : (
            <li className='flex'>
              <p className='font-bold'>Tipo de protección: &nbsp;&nbsp;</p> <span>{getDescription(protection)}</span>
            </li>
          )}
          {silicone === 'zero' ? (
            <li>
              <p>No lleva silicona</p>
            </li>
          ) : (
            <li className='flex'>
              <p className='font-bold'>Tipo de Sello: &nbsp;&nbsp;</p> <span>{getDescription(silicone)}</span>
            </li>
          )}

          <li>Los vidrios no tienen garantía una vez se hayan entregado las escotillas en la planta Arqustik.</li>
          <li>
            Para el proceso de fabricación es necesario tener definido sillar y acabado de vano (sobre piso, estucos,
            repello, etc.) para ser precisos en las medidas del producto final.
          </li>
          <li>
            Se realizará acompañamiento técnico durante el suministro e instalación del material contratado y al final
            de la entrega se hará una revisión y corrección de aquellos detalles atribuibles a la fabricación e
            instalación del producto. Este no incluye daños por agentes externos como daños causados por contratistas,
            durante la limpieza o ausencia de accesorios ya entregados.
          </li>
        </ul>
      </div>
    </section>
  )
}
export default QuotationFooter
