import { SystemResponseI, SystemsEnum } from '@models/System.model';
import { arqustikConfig } from 'arqustik.config';
import axios from 'axios';

export const getSystem = async (system: SystemsEnum) => {
  try {
    const { data } = await axios.get<SystemResponseI>(`${arqustikConfig.NEXT_SERVER}/systems/${system}`);
    return data;
  } catch (err) {
    console.error(err);
  }
};
