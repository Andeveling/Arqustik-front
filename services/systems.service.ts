import axios from 'axios'
import { arqustikConfig } from 'arqustik.config'
import { SystemsResponseI } from '@models/System.model'
import { getJWT } from './getJWT.service'

const { STRAPI_SERVER } = arqustikConfig

export const systemsService = {
  updateSystemChange: async () => {
    try {
      const { data: getAllSystems } = await axios.get<SystemsResponseI>(`${STRAPI_SERVER}/system-pvcs`)
      if (getAllSystems.data) {
        await axios.all(
          getAllSystems.data.map((system) =>
            axios.put(`${STRAPI_SERVER}/system-pvcs/${system.id}`, {
              data: { update: true },
            }),
          ),
        )
      }
    } catch (error) {
      console.log(error)
    }
  },
}
