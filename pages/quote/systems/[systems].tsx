import Container from '@components/Container'
import Heading from '@components/Heading'
import LoadingSpinner from '@components/LoadingSpinner'
import ModelsList from '@components/Public/Systems/models/ModelsList'
import { SystemResponseI } from '@models/System.model'
import { WindowDoor } from '@models/WindowModels.model'
import { fetcher } from '@services/fetcher.service'
import { arqustikConfig, endpoints } from 'arqustik.config'
import { useRouter } from 'next/router'
import { useState } from 'react'
import useSWR from 'swr'

const { NEXT_SERVER } = arqustikConfig
const { systems, window_models } = endpoints

const Systems = () => {
  const router = useRouter()
  const systemName = router.query?.systems
  // aca se hace un call al back solicitando los modelos disponibles.
  // el Link se genera de manera dinamica en la tarjeta
  const { data: system, error, isValidating } = useSWR<SystemResponseI>(`${NEXT_SERVER}/systems/${systemName}`, fetcher)
  const [items, setItems] = useState({
    windows: [],
    doors: [],
  })

  if (!system && !error)
    return (
      <Container>
        <LoadingSpinner />
      </Container>
    )
  if (error)
    return (
      <Container>
        <p>Error</p>
      </Container>
    )

  return (
    <Container>
      <Heading as='h2'>Modelos disponibles</Heading>

      {/* Renderizar modelos puertas y ventanas */}
      <Heading as='h3'>Ventanas</Heading>
      <hr />

      {system && system.data.attributes.window_models.data && (
        <ModelsList
          models={system?.data.attributes.window_models.data.filter(
            (item) => item.attributes.windowdoor === WindowDoor.Window,
          )}
        />
      )}

      <div className='mt-10'>
        <Heading as='h3'>Puertas Ventanas</Heading>
      </div>
      <hr />
      {system && system.data.attributes.window_models.data && (
        <ModelsList
          models={system?.data.attributes.window_models.data.filter(
            (item) => item.attributes.windowdoor === WindowDoor.Door,
          )}
        />
      )}
    </Container>
  )
}
export default Systems

/* 

<div className='flex justify-center flex-wrap'>
        <div className='sketchfab-embed-wrapper w-80 h-80'>
          <iframe
            title='Bella Monorriel ventana/puerta hoja 12471'
            allowFullScreen
             mozallowfullscreen='true'
              webkitallowfullscreen='true' 
            allow='autoplay; fullscreen; xr-spatial-tracking'
            xr-spatial-tracking
            execution-while-out-of-viewport
            execution-while-not-rendered
            web-share
            width='100%'
            height='100%'
            src='https://sketchfab.com/models/de2fea54091c4df39906ff60efb9b7d6/embed?autospin=1'></iframe>
        </div>
      </div>

*/
