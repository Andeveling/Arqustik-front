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

        <div className='grid grid-cols-2'>
          <div>
            <h4 className='text-lg font-bold'>{interested.data.attributes.fullName}</h4>
          </div>
          <div>
            <span>{interested.data.attributes.email}</span>
          </div>
          <div>
            <span>{interested.data.attributes.address}</span>
          </div>
          <div>
            <span>{interested.data.attributes.cellphone}</span>
          </div>
        </div>

        {interested.data.attributes.windows && (
          <InterestedWindowsList
            client={interested.data.attributes.fullName}
            windows={interested.data.attributes.windows}
          />
        )}
      </Container>
    )
}
export default Index
