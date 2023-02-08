import Container from '@components/Container'
import SystemList from '@components/Public/Systems/SystemList'
import { usePublicAppStore } from 'context/PublicAppContext'
import { Spinner } from 'flowbite-react'

export default function Quote() {
  const { systems_pvc, error } = usePublicAppStore()
  const loading = !systems_pvc && !error

  if (error)
    return (
      <Container>
        <p>{error.message}</p>
      </Container>
    )

  return loading ? (
    <Container>
      <div className='flex justify-center'>
        <Spinner aria-label='Extra large spinner' size='xl' />
      </div>
    </Container>
  ) : (
    <Container>
      <h1 className='text-4xl font-bold '>Sistemas</h1>
      {systems_pvc && systems_pvc ? <SystemList systems={systems_pvc} /> : <></>}
    </Container>
  )
}
