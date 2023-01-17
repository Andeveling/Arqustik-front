import axios from 'axios'
import { arqustikConfig } from 'arqustik.config'
import { getJWT } from './getJWT.service'

const { NEXT_SERVER } = arqustikConfig

const jwt = async () => await getJWT()

export const systemsService = {
  update: async (id: number) => {
    try {
      const response = await axios.put(`${NEXT_SERVER}/systems/update-system`, {
        jwt,
        systemID: id,
        data: {
          update: false,
        },
      })
      return response.data
    } catch (error) {}
  },
}
