import { getJWT } from '@services/getJWT.service';
import { arqustikConfig } from 'arqustik.config';
import axios, { AxiosRequestConfig } from 'axios';

import { endpoints } from 'arqustik.config';

export const AxiosInterceptor = () => {
  const updateHeader = async (request: AxiosRequestConfig) => {
    try {
      const JWT = await getJWT();
      if (!JWT) return request;
      const newHeaders = {
        Authorization: `Bearer ${JWT}`,
        'Content-type': 'application/json',
      };
      request.headers = newHeaders;
      return request;
    } catch (error) {
      return request;
    }
  };

  axios.interceptors.request.use((request) => {
    if (request.url?.includes(arqustikConfig.STRAPI_SERVER)) {
      if (request.url.includes(endpoints.interesteds) && request.method == 'POST') return request;
      if (request.url.includes('/auth/local')) return request;
      return updateHeader(request);
    } else {
      return request;
    }
  });

  /* axios.interceptors.response.use(
    (response: AxiosResponse) => {
      return response
    },
    (error) => {
      console.log("error", getValidationError(error.code))
      return Promise.reject(error)
    }
  ) */
};
