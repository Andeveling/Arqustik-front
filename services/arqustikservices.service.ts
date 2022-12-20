import { ServiceI } from '@models/Service.model'
import { arqustikConfig, endpoints } from 'arqustik.config'
import axios from 'axios'

const { STRAPI_SERVER } = arqustikConfig
const { services } = endpoints

export const arqustikService = {
  update: async (serviceID: ServiceI['id'], data: any) => {
    try {
      axios.put(`${STRAPI_SERVER}${services}/${serviceID}`, data)
    } catch (error) {}
  },
}
