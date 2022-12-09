import { getJWT } from "./getJWT.service"
import { Axios } from "axios"
import { arqustikConfig } from "arqustik.config"
import { ResponseClientsI } from "@models/Client.model"

const jwt = async () => await getJWT()

const axios = new Axios({
  baseURL: arqustikConfig.STRAPI_SERVER,
  headers: {
    Authorization: `Bearer ${jwt}`,
    "Content-Type": "application/json",
  },
})

export const ClientsApiService = {
  getAll: async () => {
    try {
      const response = await axios.get<ResponseClientsI>("/clientes?sort=createdAt:desc")
      return response.data
    } catch (error) {}
  },
}
