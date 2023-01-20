import ClientList from '@components/Client/ClientList'
import Container from '@components/Container'
import LoadingSpinner from '@components/LoadingSpinner'
import { ResponseClientsI } from '@models/Client.model'
import { fetcher } from '@services/fetcher.service'
import { arqustikConfig, endpoints } from 'arqustik.config'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import useSWR from 'swr'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx)
  if (session === null) {
    // redirect
    return {
      redirect: {
        destination: '/api/auth/signin',
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

const { clients } = endpoints
const { STRAPI_SERVER } = arqustikConfig

export default function Quoter() {
  const { data: clientsList, error } = useSWR<ResponseClientsI>(
    `${STRAPI_SERVER}${clients}?sort=createdAt:desc`,
    fetcher,
  )

  if (!clientsList)
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
      <ClientList clients={clientsList} />
    </Container>
  )
}
