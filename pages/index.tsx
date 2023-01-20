import Container from '@components/Container'
import Heading from '@components/Heading'
import CarouselGlass from '@components/IndexPageComponents/CarouselGlass'
import { Suspense } from 'react'
import { PhoneIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/solid'

export default function Home() {
  return (
    <Suspense fallback={null}>
      <Container>
        <CarouselGlass />
        <div className='mt-8'>
          <Heading>¿Como usar esta aplicación?</Heading>
          <div className='grid grid-cols-2 gap-10'>
            <div>
              <Heading as='h3'>Desde un Computador</Heading>
              <ul className='list-decimal'>
                <li>
                  <span>Dirígete a cotizar en el menú de navegación en la parte superior.</span>
                </li>
                <li>
                  <span>Selecciona un sistema que se adapte a la solución que requieres.</span>
                </li>
                <li>
                  <span>Después visualiza los modelos disponibles en esta herramienta.</span>
                </li>
                <li>
                  <span>
                    Oprima el botón de añadir, configura tu ventana con los parámetros necesarios como, nombre de
                    referencia, ancho, alto, selecciona el vidrio según tu necesidad.
                  </span>
                </li>
                <li>
                  <span>
                    Luego dale clic al botón de añadir y repite el ciclo hasta que tengas los modelos necesarios.
                  </span>
                </li>
                <li>
                  <span>
                    Luego dirígete a la bolsa de compras y dale, descargar, cotización, completa el formulario e imprime
                    el documento.
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <Heading as='h3'>Desde un Celular</Heading>

              <ul className='list-decimal'>
                <li>
                  <span>Dirígete a cotizar en el menú desplegable en la parte superior derecha. </span>
                </li>
                <li>
                  <span>Selecciona un sistema que se adapte a la solución que requieres.</span>
                </li>
                <li>
                  <span>Después visualiza los modelos disponibles en esta herramienta.</span>
                </li>
                <li>
                  <span>
                    Oprima el botón de añadir, configura tu ventana con los parámetros necesarios como, nombre de
                    referencia, ancho, alto, selecciona el vidrio según tu necesidad.
                  </span>
                </li>
                <li>
                  <span>
                    Luego dale clic al botón de añadir y repite el ciclo hasta que tengas los modelos necesarios.
                  </span>
                </li>
                <li>
                  <span>
                    Luego dirígete a la bolsa de compras y dale, descargar, cotización, completa el formulario e imprime
                    el documento.
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className='mt-12'>
            <p>
              <strong>NOTA: </strong>Recuerde que si requiere un producto que no se encuentra registrado en esta app,
              puede solicitarlo a través de la línea <span className='text-orange-500'>+57 300 465 3936</span> o a
              nuestro correo{' '}
              <a href='comercial1@arqustik.com' className='text-blue-600' target='_blank'>
                comercial1@arqustik.com
              </a>
            </p>
          </div>
        </div>
      </Container>
    </Suspense>
  )
}
