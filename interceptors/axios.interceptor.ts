import { getJWT } from "@services/getJWT.service"
import { arqustikConfig } from "arqustik.config"
import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import { getValidationError } from "utils/get-validation-error"

export const AxiosInterceptor = () => {
  const updateHeader = async (request: AxiosRequestConfig) => {
    const JWT = await getJWT()
    const newHeaders = {
      Authorization: `Bearer ${JWT}`,
      "Content-type": "application/json",
    }
    request.headers = newHeaders
    return request
  }

  axios.interceptors.request.use((request) => {
    if (request.url?.includes(arqustikConfig.STRAPI_SERVER)) return updateHeader(request)
    else return request
  })

  /* axios.interceptors.response.use(
    (response: AxiosResponse) => {
      return response
    },
    (error) => {
      console.log("error", getValidationError(error.code))
      return Promise.reject(error)
    }
  ) */
}
