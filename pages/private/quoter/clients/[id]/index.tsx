import ClientQuotations from "@components/Client/ClientQuotations"
import Container from "@components/Container"
import LoadingSpinner from "@components/LoadingSpinner"
import { fetcher } from "@services/fetcher.service"
import { arqustikConfig, endpoints } from "arqustik.config"
import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"
import { useRouter } from "next/router"
import useSWR from "swr"

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx)
  if (!session) {
    return {
      redirect: {
        destination: "/",
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

export default function ClientByID() {
  const router = useRouter()
  const clientID = router.query?.id
  const { data, error, isValidating } = useSWR(
    `${arqustikConfig.STRAPI_SERVER}${endpoints.clients}/${clientID}?populate=quotations`,
    fetcher
  )

  if (error) {
    return <Container>{JSON.stringify(error)}</Container>
  } else if (isValidating) {
    return (
      <Container>
        <LoadingSpinner />
      </Container>
    )
  } else {
    return (
      <Container>
        <ClientQuotations client={data} />
      </Container>
    )
  }
}
