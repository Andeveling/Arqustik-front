import { SystemsResponseI } from '@models/System.model'
import { fetcher } from '@services/fetcher.service'
import { arqustikConfig, endpoints } from 'arqustik.config'
import useSWR from 'swr'

const { STRAPI_SERVER } = arqustikConfig
const { systems } = endpoints

const useSystems = () => {
  const { data: systems_pvc } = useSWR<SystemsResponseI>(`${STRAPI_SERVER}${systems}`, fetcher)
  return <div>useSystems</div>
}
export default useSystems
