import { AuthResponseI, CredentialsI } from '@models/services/auth.model'
import axios from 'axios'

export const signIn = async ({ username, password }: CredentialsI) => {
  console.log(username, password)
  const response = await axios.post<AuthResponseI>(`http://localhost:1337/api/auth/local`, {
    identifier: username,
    password: password,
  })
  return response.data
  /*   const response = await fetch(`http://localhost:1337/api/auth/local`, {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  }).catch((err) => console.log(err))

  return response.json() */
}
