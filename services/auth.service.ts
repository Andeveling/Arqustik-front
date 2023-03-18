import { AuthResponseI, CredentialsI } from '@models/services/auth.model';
import { arqustikConfig, endpoints } from 'arqustik.config';
import axios from 'axios';

const { STRAPI_SERVER } = arqustikConfig;
const { auth } = endpoints;

export const signIn = async ({ username, password }: CredentialsI) => {
  const response = await axios.post<AuthResponseI>(`${STRAPI_SERVER}${auth}`, {
    identifier: username,
    password: password,
  });
  return response.data;
  /*   const response = await fetch(`http://localhost:1337/api/auth/local`, {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  }).catch((err) => console.log(err))

  return response.json() */
};
