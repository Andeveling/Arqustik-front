import { getJWT } from '@services/getJWT.service'
import { arqustikConfig } from 'arqustik.config'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { getValidationError } from 'utils/get-validation-error'

export const AxiosInterceptor = () => {
  const updateHeader = async (request: AxiosRequestConfig) => {
    try {
      const JWT = await getJWT()
      if (!JWT) return request
      const newHeaders = {
        Authorization: `Bearer ${JWT}`,
        'Content-type': 'application/json',
      }
      request.headers = newHeaders
      return request
    } catch (error) {
      return request
    }
  }

  axios.interceptors.request.use((request) => {
    if (request.url?.includes(arqustikConfig.STRAPI_SERVER)) return updateHeader(request)
    return request
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
