import { SystemResponseI } from '@models/System.model';
import { arqustikConfig, endpoints } from 'arqustik.config';
import axios from 'axios';
import { promises as fs } from 'fs';
import { NextApiHandler } from 'next';
import path from 'path';

const { STRAPI_SERVER } = arqustikConfig;
const { systems } = endpoints;
const axiosApiInstance = axios.create({});

const updateSystem: NextApiHandler = async (req, res) => {
  const jsonDirectory = path.join(process.cwd(), 'json');
  try {
    const { jwt, systemID, ...data } = req.body;
    const { data: system } = await axiosApiInstance.get<SystemResponseI>(
      `${STRAPI_SERVER}${systems}/${systemID}?populate=*`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      },
    );

    await axiosApiInstance.put(`${STRAPI_SERVER}/system-pvcs/${systemID}`, data, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    // TODO: Aca debemos pasar el systema que se desea instlar '/bella-sliding.json'
    await fs.writeFile(jsonDirectory + `/${system.data.attributes.title.toLowerCase()}.json`, JSON.stringify(system), 'utf8');
    // DO:
    res.status(200).json('Actualizacion Realizada con Exito');
  } catch (error) {
    res.status(500).json(error);
  }
};

export default updateSystem;
