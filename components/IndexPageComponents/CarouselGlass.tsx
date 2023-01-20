import { Carousel } from 'flowbite-react'

const CarouselGlass = () => {
  return (
    <div className='h-56 w-full mt-2 sm:h-64 xl:h-80 2xl:h-96'>
      <Carousel slideInterval={5000}>
        <div
          className='grid h-full w-full items-center justify-center
        bg-[url(https://deceuninck-iq.com/wp-content/uploads/2021/02/Gallery-3.jpg)]
        bg-origin-border 
        bg-center 
        bg-cover
        bg-no-repeat
        bg-transparent      
        '>
          <div className='grid items-center w-full h-full text-center space-x-2 space-y-2'>
            <div className='bg-gray-900 p-4 rounded-lg text-gray-0 opacity-80'>
              <h3 className='text-4xl font-bold'>Vidrio 4 mm Crudo</h3>
              <div className='grid gap-5 text-left'>
                {/* <div>
                  <span className='font-bold'>Pros</span>
                  <ul>
                    <li>Economico</li>
                    <li>Liviano</li>
                    <li>Ventanas pequeñas</li>
                  </ul>
                </div> */}
                <div>
                  <ul>
                    <li>
                      <span>Posee una alta transmisión luminosa</span>
                    </li>
                    <li>
                      <span>Superficie plana</span>
                    </li>
                    <li>
                      <span>Gran claridad óptica</span>
                    </li>
                    <li>
                      <span>Economico</span>
                    </li>
                    <li>
                      <span>Optimo para ventanas pequeñas</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2 */}
        <div
          className='grid h-full w-full items-center justify-center
        bg-[url(https://deceuninck-iq.com/wp-content/uploads/2021/02/Gallery-13.jpg)]
        bg-origin-border 
        bg-center 
         bg-cover
        bg-no-repeat
        bg-transparent      
        '>
          <div className='grid items-center w-full h-full text-center space-x-2 space-y-2'>
            <div className='bg-gray-900 p-4 rounded-lg text-gray-0 opacity-80'>
              <h3 className='text-4xl font-bold'>Vidrio 5mm Templado</h3>
              <div className='grid gap-5 text-left'>
                <div>
                  <ul>
                    <li>
                      <span>Posee una alta resistencia al impacto</span>
                    </li>
                    <li>
                      <span>Seguro</span>
                    </li>
                    <li>
                      <span>Ideal para puertas ventanas</span>
                    </li>
                    <li>
                      <span>Economico</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 */}

        <div
          className='grid h-full w-full items-center justify-center
        bg-[url(http://deceuninck-iq.com/wp-content/uploads/2021/02/Gallery-12.jpg)]
        bg-origin-border 
        bg-center 
         bg-cover
        bg-no-repeat
        bg-transparent      
        '>
          <div className='grid items-center w-full h-full text-center space-x-2 space-y-2'>
            <div className='bg-gray-900 p-4 rounded-lg text-gray-0 opacity-80'>
              <h3 className='text-4xl font-bold'>Vidrio 8 mm Laminado</h3>
              <div className='grid gap-5 text-left'>
                <div>
                  <ul>
                    <li>
                      <span>Ideal para soluciones acústicas a baja escala</span>
                    </li>
                    <li>
                      <span>Posee una alta resistencia al impacto</span>
                    </li>
                    <li>
                      <span>Seguro</span>
                    </li>
                    <li>
                      <span>Ideal para puertas ventanas</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Carousel>
    </div>
  )
}
export default CarouselGlass

/* 

        <img src='https://flowbite.com/docs/images/carousel/carousel-1.svg' alt='...' />
        <img src='https://flowbite.com/docs/images/carousel/carousel-2.svg' alt='...' />
        <img src='https://flowbite.com/docs/images/carousel/carousel-3.svg' alt='...' />
        <img src='https://flowbite.com/docs/images/carousel/carousel-4.svg' alt='...' />
        <img src='https://flowbite.com/docs/images/carousel/carousel-5.svg' alt='...' />

*/
