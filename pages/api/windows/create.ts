import { SystemsEnum } from '@models/System.model';
import { getPriceBellaSliding } from '@utils/getPricesBellaSliding';
import { getPricesEverestMax } from '@utils/getPricesEverestMax';
import { NextApiHandler } from 'next';

const createWindow: NextApiHandler = async (req, res) => {
  const { method } = req;
  switch (method) {
    case 'POST':
      try {
        const { body } = req;
        switch (body.system) {
          case SystemsEnum.BellaSliding:
            const windowBella = await getPriceBellaSliding(body);
            return res.json(windowBella);

          case SystemsEnum.EverestMax:
            const windowEverest = await getPricesEverestMax(body);
            /* console.log(windowEverest); */
            return res.json(windowEverest);
        }
      } catch (error) {
        res.json(error);
      }
      break;

    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};

export default createWindow;
