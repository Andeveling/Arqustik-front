import { AuthResponseI, CredentialsI } from "@models/services/auth.model"
import axios from "axios"
import { arqustikConfig } from "arqustik.config"

export const signIn = async ({ username, password }: CredentialsI) => {
  const response = await axios.post<AuthResponseI>(`${arqustikConfig.STRAPI_SERVER}/auth/local`, {
    identifier: username,
    password,
  })
  return response.data
}
