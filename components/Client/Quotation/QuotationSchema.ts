import * as yup from "yup";

export const QuotationSchema = yup.object().shape({
  project: yup.string().required(),
  arqustik_id: yup.string().required(),
  address: yup.string().required(),
  clientID: yup.number().transform(() => yup.string()),
  comment: yup.string(),
  installation: yup.bool().required(),
  transport: yup.bool().required(),
  polyurethane: yup.bool().required(),
  transport_mount: yup.number(),
});

export const QuotationUpdateSchema = yup.object().shape({
  project: yup.string(),
  arqustik_id: yup.string(),
  address: yup.string(),
  clientID: yup.number().transform(() => yup.string()),
  comment: yup.string().optional().nullable(),
  installation: yup.bool(),
  transport: yup.bool(),
  polyurethane: yup.bool(),
  transport_mount: yup.number(),
});
