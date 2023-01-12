import { ClientDataI, ClientI } from '@models/Client.model'
import { arqustikConfig, endpoints } from 'arqustik.config'
import axios from 'axios'

const { STRAPI_SERVER } = arqustikConfig
const { clients } = endpoints

export const clientPVC = {
  create: async (user: any) => await axios.post<ClientDataI>(`${STRAPI_SERVER}${clients}`, user),
  update: async (id: ClientI['id'], user: any) => await axios.put(`${STRAPI_SERVER}${clients}/${id}`, user),
  delete: async (id: ClientI['id']) =>
    await axios
      .delete(`${STRAPI_SERVER}${clients}/${id}`)
      .then((res) => res.data)
      .catch((err) => err),
}
