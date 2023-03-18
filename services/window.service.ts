import { CreateWindowPVCI, WindowI } from '@models/WindowPVC.model';
import { arqustikConfig, endpoints } from 'arqustik.config';
import axios from 'axios';

const { STRAPI_SERVER } = arqustikConfig;
const { windows } = endpoints;

export const windowPVC = {
  create: async (window: CreateWindowPVCI) =>
    await axios
      .post(`${STRAPI_SERVER}${windows}`, { data: window })
      .then((res) => res.data)
      .catch((err) => console.log(err)),
  delete: async (id: WindowI['id']) =>
    await axios
      .delete(`${STRAPI_SERVER}${windows}/${id}`)
      .then((res) => res.data)
      .catch((err) => console.log(err)),
  update: async (window: CreateWindowPVCI, windowID: CreateWindowPVCI['window']) =>
    await axios
      .put(`${STRAPI_SERVER}${windows}/${windowID}`, {
        data: window,
      })
      .then((res) => res.data)
      .catch((err) => console.log(err)),
};
