import Container from '@components/Container'
import InterestedList from '@components/Interested/InterestedList'
import LoadingSpinner from '@components/LoadingSpinner'
import { fetcher } from '@services/fetcher.service'
import { arqustikConfig, endpoints } from 'arqustik.config'
import useSWR from 'swr'

const { interesteds } = endpoints
const { STRAPI_SERVER } = arqustikConfig

export default function Interested() {
  const { data: interestedList, error } = useSWR(`${STRAPI_SERVER}${interesteds}?sort=createdAt:desc`, fetcher)
  console.log(interestedList)

  if (error)
    return (
      <Container>
        <p>{error.message}</p>
      </Container>
    )

  if (!interestedList)
    return (
      <Container>
        <LoadingSpinner />
      </Container>
    )

  return (
    <Container>
      <InterestedList interestedList={interestedList} />
    </Container>
  )
}
