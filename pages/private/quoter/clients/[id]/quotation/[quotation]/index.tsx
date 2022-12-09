import QuotationHeader from "@components/Client/Quotation/QuotationHeader"
import Container from "@components/Container"
import Heading from "@components/Heading"
import ModalR from "@components/ModalR"
import WindowsPVCForm, { ProjectDataProps } from "@components/WindowsPVC/WindowsPVCForm"
import WindowsPVCList from "@components/WindowsPVC/WindowsPVCList"
import { QuotationResponseI } from "@models/Quotation.model"
import { fetcher } from "@services/fetcher.service"
import { arqustikConfig, endpoints } from "arqustik.config"
import { Button } from "flowbite-react"
import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"
import { useRouter } from "next/router"
import useSWR from "swr"
import { DocumentTextIcon } from "@heroicons/react/24/solid"
import Link from "next/link"

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

const { quotations } = endpoints
const { STRAPI_SERVER } = arqustikConfig

export default function QuotationByClientID() {
  const router = useRouter()

  const { data: quotation, error } = useSWR<QuotationResponseI>(
    `${STRAPI_SERVER}${quotations}/${router.query.quotation}?populate=*&sort=createdAt:asc`,
    fetcher
  )

  let projectData: ProjectDataProps = {
    installation: false,
    polyurethane: false,
    protection: "zero",
    transport: false,
    silicone: "zero",
  }

  if (quotation) {
    const {
      data: {
        attributes: { installation, polyurethane, silicone, transport, protection, windows, transport_mount },
      },
    } = quotation
    projectData = {
      installation,
      polyurethane,
      silicone,
      transport,
      protection,
    }

    return (
      <Container>
        <div className='flex justify-between'>
          <Heading as='h2'>Cotización</Heading>
          <ModalR title='Ventana Nueva' form={<WindowsPVCForm projectData={projectData} />} />
        </div>
        <hr />

        <QuotationHeader info={quotation?.data.attributes} />
        <WindowsPVCList windows={windows} projectData={projectData} transport_mount={transport_mount ?? 0} />
        <div className='my-5'>
          <Link href={`/private/quoter/clients/${router.query.id}/quotation/${router.query.quotation}/pdf`}>
            <Button color='success' className='flex w-24 p-4'>
              <DocumentTextIcon className='w-6 h-6' />
              <span className='ml-2'>Resumén</span>
            </Button>
          </Link>
        </div>
      </Container>
    )
  } else {
    return (
      <Container>
        <p>{error}</p>
      </Container>
    )
  }
}
