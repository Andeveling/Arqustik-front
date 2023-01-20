import { ClientDataI } from '@models/Client.model'
import { InterestedI } from '@models/Interested.model'
import { ClientAttributes } from '@models/WindowPVC.model'
import { arqustikConfig, endpoints } from 'arqustik.config'
import axios from 'axios'

const { STRAPI_SERVER } = arqustikConfig
const { interesteds } = endpoints

export const interestedPVC = {
  create: async (user: any) => await axios.post<ClientDataI>(`${STRAPI_SERVER}${interesteds}`, user),
  update: async (id: InterestedI['id'], interested: any) =>
    await axios.put(`${STRAPI_SERVER}${interesteds}/${id}`, interested),
  delete: async (id: InterestedI['id']) =>
    await axios
      .delete(`${STRAPI_SERVER}${interesteds}/${id}`)
      .then((res) => res.data)
      .catch((err) => err),
}
