import * as yup from 'yup'

export const UpdateServiceSchema = yup.object().shape({
  price: yup
    .number()
    .min(0, 'No puede ser negativo')
    .typeError('El precio de mano de obra debe ser un numero')
    .required(),
  material: yup
    .number()
    .min(0, 'No puede ser negativo')
    .typeError('El precio de materiales debe ser un numero')
    .required(),
})
