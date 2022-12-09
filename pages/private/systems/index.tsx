import Container from "@components/Container"
import Heading from "@components/Heading"
import LoadingSpinner from "@components/LoadingSpinner"
import SystemsList from "@components/systems/SystemsList"
import { SystemsResponseI } from "@models/System.model"
import { fetcher as getSystems } from "@services/fetcher.service"
import { arqustikConfig } from "arqustik.config"
import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"
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
      ...session,
    },
  }
}

export default function Systems() {
  const { data: systems, error } = useSWR<SystemsResponseI>(`${arqustikConfig.STRAPI_SERVER}/system-pvcs`, getSystems)
  return (
    <Container title='Systems-PVC'>
      <div className='flex justify-between'>
        <Heading as='h3'>Sistemas PVC</Heading>
      </div>

      {error ? <p>{error.message}</p> : !systems ? <LoadingSpinner /> : <SystemsList systems={systems} />}
    </Container>
  )
}
