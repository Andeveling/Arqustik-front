import { MailDataRequired } from '@sendgrid/helpers/classes/mail'
import mail from '@sendgrid/mail'
import { arqustikConfig } from 'arqustik.config'
import { NextApiHandler } from 'next'

mail.setApiKey(arqustikConfig.SENDGRID_API_KEY)

const handler: NextApiHandler = async (req, res) => {
  try {
    const { method } = req
    const { body } = req

    console.log(arqustikConfig.SENDGRID_API_KEY)
    console.log(req.body.fullName)
    switch (method) {
      case 'POST':
        const message = `Name: ${body.fullName}\r\n`
        const data: MailDataRequired = {
          from: 'comercial1@arqustik.com',
          to: body.email,
          subject: `Cotización Arqustik`,
          text: message,
          html: message.replace(/\r\n/g, '<br>'),
        }

        await mail.send(data).catch((err) => console.log(err))
        res.status(200).json({ message: 'mail sended' })
        break
      default:
        res.setHeader('Allow', ['POST'])
        res.status(405).end(`Method ${method} Not Allowed`)
        break
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

export default handler
