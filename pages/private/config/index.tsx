import AdminCost from '@components/Config/Admin/AdminCost'
import Contractor from '@components/Config/Contractor/Contractor'
import Container from '@components/Container'
import { Tab } from '@headlessui/react'
import { AdminCostResponseI } from '@models/AdminCost.model'
import { ServicesResponseI } from '@models/Service.model'
import { fetcher } from '@services/fetcher.service'
import { arqustikConfig, endpoints } from 'arqustik.config'
import cn from 'classnames'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import useSWR from 'swr'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx)
  if (session === null) {
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
const { STRAPI_SERVER } = arqustikConfig
const { services, administrative_costs } = endpoints

const Config = () => {
  const { data: servicesData, error: servicesError } = useSWR<ServicesResponseI>(`${STRAPI_SERVER}${services}`, fetcher)
  const { data: administrative_costData, error: administrative_costError } = useSWR<AdminCostResponseI>(
    `${STRAPI_SERVER}${administrative_costs}`,
    fetcher,
  )

  if (!servicesData || !administrative_costData)
    return (
      <Container>
        <p>Loading</p>
      </Container>
    )
  if (servicesError || administrative_costError)
    return (
      <Container>
        <p>Error</p>
      </Container>
    )
  if (servicesData && administrative_costData) {
    const dollar = administrative_costData.data.find((cost) => cost.attributes.title === 'dollar')
    return (
      <Container>
        <Tab.Group>
          <Tab.List className='flex space-x-1 rounded-xl bg-gray-900/20 p-1'>
            <Tab
              className={({ selected }) =>
                cn(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-orange-500',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-gray-900 focus:outline-none focus:ring-2',
                  selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
                )
              }>
              Admin
            </Tab>
            <Tab
              className={({ selected }) =>
                cn(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-orange-500',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-gray-900 focus:outline-none focus:ring-2',
                  selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
                )
              }>
              Contratistas
            </Tab>
          </Tab.List>

          <Tab.Panels className='mt-2'>
            <Tab.Panel className={cn('rounded-xl bg-gray-300 dark:bg-gray-900 p-3', 'ring-white ring-opacity-60 ')}>
              <AdminCost adminCost={administrative_costData} />
            </Tab.Panel>
            <Tab.Panel className={cn('rounded-xl bg-gray-300 dark:bg-gray-900 p-3', 'ring-white ring-opacity-60')}>
              {servicesData && administrative_costData ? <Contractor services={servicesData} /> : <></>}
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </Container>
    )
  }
}
export default Config
