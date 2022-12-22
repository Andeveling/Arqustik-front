import Container from '@components/Container'
import Heading from '@components/Heading'
import LoadingSpinner from '@components/LoadingSpinner'
import SystemsList from '@components/systems/SystemsList'
import { usePublicAppStore } from 'context/PublicAppContext'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'

export default function Systems() {
  const { systems_pvc, error } = usePublicAppStore()
  const loading = !systems_pvc && !error

  if (error)
    return (
      <Container>
        <p>Error {error.message} </p>
      </Container>
    )
  if (loading)
    return (
      <Container>
        <LoadingSpinner />
      </Container>
    )
  return (
    <Container title='Systems-PVC'>
      <div className='flex justify-between'>
        <Heading as='h3'>Sistemas PVC</Heading>
      </div>
      <SystemsList systems={systems_pvc} />
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx)
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  return {
    props: {
      session,
    },
  }
}
