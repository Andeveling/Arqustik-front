import * as yup from "yup"

export const CreateClientSchema = yup.object().shape({
  fullName: yup.string().required(),
  cellphone: yup.string().required(),
  address: yup.string().required(),
  email: yup.string().email().required(),
})

export const UpdateClientSchema = yup.object().shape({
  fullName: yup.string(),
  cellphone: yup.string(),
  address: yup.string(),
  email: yup.string().email(),
})
