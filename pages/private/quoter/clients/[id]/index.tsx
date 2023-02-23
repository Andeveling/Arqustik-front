import ClientQuotations from '@components/Client/ClientQuotations'
import Container from '@components/Container'
import LoadingSpinner from '@components/LoadingSpinner'
import { fetcher } from '@services/fetcher.service'
import { arqustikConfig, endpoints } from 'arqustik.config'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { Suspense } from 'react'

const { STRAPI_SERVER } = arqustikConfig
const { clients } = endpoints

export default function ClientByID() {
  const router = useRouter()
  const clientID = router.query?.id
  const { data, error, isValidating } = useSWR(`${STRAPI_SERVER}${clients}/${clientID}?populate=quotations`, fetcher)

  if (error) return <Container>{<p>Algo salio mal</p>}</Container>

  if (isValidating || !data)
    return (
      <Suspense fallback={null}>
        <Container>
          <LoadingSpinner />
        </Container>
      </Suspense>
    )

  if (data)
    return (
      <Suspense fallback={null}>
        <Container>
          <ClientQuotations client={data} />
        </Container>
      </Suspense>
    )
}
