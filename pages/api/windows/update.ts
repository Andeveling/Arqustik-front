import { NextApiHandler } from 'next'
import { getPrice } from '@utils/getPricesBellaSliding'

const updateWindow: NextApiHandler = async (req, res) => {
  const { method, body } = req
  switch (method) {
    case 'PUT':
      try {
        const window = await getPrice(body)
        res.status(200).json(window)
      } catch (e) {
        console.error('Request error', e)
        res.status(500).end()
      }
      break
    default:
      res.setHeader('Allow', ['PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
      break
  }
}

export default updateWindow
