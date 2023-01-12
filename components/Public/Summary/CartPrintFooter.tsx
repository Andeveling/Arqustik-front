const CartPrintFooter = () => {
  return (
    <div className='hidden print:block'>
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
          <li>No incluye el transporte.</li>
          <li>No incluye instalación</li>
          <li>No lleva poliuretano</li>
          <li>No lleva Protección</li>
          <li>No lleva silicona</li>
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
    </div>
  )
}
export default CartPrintFooter
