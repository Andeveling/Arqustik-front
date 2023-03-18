import { QuotationI } from '@models/Quotation.model';
import { arqustikConfig, endpoints } from 'arqustik.config';
import axios from 'axios';

const { STRAPI_SERVER } = arqustikConfig;
const { quotations } = endpoints;

export const quotationPVC = {
  create: async (quotation: any) => await axios.post(`${STRAPI_SERVER}${quotations}`, quotation),
  update: async (id: QuotationI['id'], quotation: any) =>
    await axios.put(`${STRAPI_SERVER}${quotations}/${id}`, quotation),
  delete: async (id: QuotationI['id']) =>
    await axios
      .delete(`${STRAPI_SERVER}${quotations}/${id}`)
      .then((res) => res.data)
      .catch((err) => err),
};
