import Container from '@components/Container'
import Heading from '@components/Heading'
import InterestedWindowsList from '@components/Interested/InterestedWindowsList'
import { InterestedResponseI } from '@models/Interested.model'
import { fetcher } from '@services/fetcher.service'
import { arqustikConfig, endpoints } from 'arqustik.config'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import useSWR from 'swr'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx)
  return !session
    ? {
        redirect: { destination: '/', permanent: false },
      }
    : {
        props: { session },
      }
}

const { STRAPI_SERVER } = arqustikConfig
const { interesteds } = endpoints

const Index = () => {
  const router = useRouter()
  const { data: interested, error } = useSWR<InterestedResponseI>(
    `${STRAPI_SERVER}${interesteds}/${router.query.id}`,
    fetcher,
  )

  console.log(Array.isArray(interested?.data.attributes.windows))

  if (error)
    return (
      <Container>
        <p>Error</p>
      </Container>
    )

  if (interested)
    return (
      <Container>
        <Heading as='h3'>Ventanas a cotizar</Heading>

        <ul className='space-y-1 mb-4'>
          <li>
            <h4 className='text-lg font-bold'>{interested.data.attributes.fullName}</h4>
          </li>
          <li>
            <span>{interested.data.attributes.email}</span>
          </li>
          <li>
            <p>{interested.data.attributes.address}</p>
          </li>
          <li>
            <span>{interested.data.attributes.cellphone}</span>
          </li>
        </ul>

        {interested.data.attributes.windows && <InterestedWindowsList windows={interested.data.attributes.windows} />}
      </Container>
    )
}
export default Index
