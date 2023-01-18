import { AdminCostI } from '@models/AdminCost.model'
import { ServiceI } from '@models/Service.model'
import { arqustikConfig, endpoints } from 'arqustik.config'
import axios from 'axios'

const { STRAPI_SERVER } = arqustikConfig
const { administrative_costs } = endpoints

export const adminCostService = {
  update: async (adminCostID: AdminCostI['id'], data: any) => {
    try {
      const serviceResponse = await axios.put(`${STRAPI_SERVER}${administrative_costs}/${adminCostID}`, data)

      return serviceResponse.data
    } catch (error) {}
  },
}
