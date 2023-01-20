import Container from '@components/Container'
import Heading from '@components/Heading'
import CarouselGlass from '@components/IndexPageComponents/CarouselGlass'
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
      <CarouselGlass />
      <div className='mt-2'>
        <Heading as='h2'>Modelos disponibles</Heading>
      </div>

      {/* Renderizar modelos puertas y ventanas */}
      <Heading as='h3'>Ventanas</Heading>
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
