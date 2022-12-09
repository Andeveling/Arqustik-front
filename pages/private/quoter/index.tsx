import ClientList from "@components/Client/ClientList"
import Container from "@components/Container"
import LoadingSpinner from "@components/LoadingSpinner"
import { ResponseClientsI } from "@models/Client.model"
import { fetcher } from "@services/fetcher.service"
import { arqustikConfig, endpoints } from "arqustik.config"
import axios from "axios"
import { GetServerSideProps } from "next"
import { getSession, useSession } from "next-auth/react"
import useSWR from "swr"

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx)
  if (session === null) {
    // redirect
    return {
      redirect: {
        destination: "/api/auth/signin",
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

export default function Quoter() {
  const session = useSession()

  const { data: clients, error } = useSWR<ResponseClientsI>(
    [`${arqustikConfig.STRAPI_SERVER}${endpoints.clients}?sort=createdAt:desc`, session.data?.user.jwt],
    fetcher
  )

  if (!clients)
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
      <ClientList clients={clients} />
    </Container>
  )
}
