import logo from '@public/img/logo.png';
import Image from 'next/image';
const CartPrintHeader = () => {
  return (
    <div>
      <div className='flex justify-between'>
        <Image className='block' width={200} src={logo} alt={'Arqustik logo'} />
        <div>
          <p>{new Date().toLocaleDateString()}</p>
        </div>
      </div>
      <hr className='my-4 hidden print:block' />
      <div className='hidden print:block'>
        <div className='grid grid-cols-2 my-4'>
          <div className='col-span-2'>
            <div className='text-lg'>
              <p className='font-bold text-3xl'>Cotización</p>
            </div>
          </div>
        </div>
        <div className='text-base print:text-xs py-2'>
          <p className='text-justify'>
            De acuerdo a sus indicaciones, le presentamos la oferta de productos que solicitó. Agradecemos la confianza
            depositada en nuestra compañía y le invitamos a leer el contenido de esta propuesta. Quedamos a su
            disposición para aclarar cualquier inquietud y a la espera de una respuesta positiva que nos convierta en su
            aliado en el proceso.
          </p>
        </div>
      </div>
    </div>
  );
};
export default CartPrintHeader;
