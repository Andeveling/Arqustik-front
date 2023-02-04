import ClientQuotations from '@components/Client/ClientQuotations'
import Container from '@components/Container'
import LoadingSpinner from '@components/LoadingSpinner'
import { fetcher } from '@services/fetcher.service'
import { arqustikConfig, endpoints } from 'arqustik.config'
import { useRouter } from 'next/router'
import useSWR from 'swr'

const { STRAPI_SERVER } = arqustikConfig
const { clients } = endpoints

export default function ClientByID() {
  const router = useRouter()
  const clientID = router.query?.id
  const { data, error, isValidating } = useSWR(`${STRAPI_SERVER}${clients}/${clientID}?populate=quotations`, fetcher)

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
