import { NextApiHandler } from "next"
import { getSession } from "next-auth/react"
import { getPrice } from "utils/getPrices"

const createWindow: NextApiHandler = async (req, res) => {
  const { method } = req
  switch (method) {
    case "POST":
      const { body } = req
      const window = await getPrice(body)
      res.json(window)
      break

    default:
      res.setHeader("Allow", ["POST"])
      res.status(405).end(`Method ${method} Not Allowed`)
      break
  }
}

export default createWindow
