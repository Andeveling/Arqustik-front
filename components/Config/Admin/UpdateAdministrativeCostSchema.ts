import * as yup from 'yup'

export const UpdateAdministrativeCostSchema = yup.object().shape({
  value: yup.number().min(0, 'No puede ser negativo').typeError('El valor debe ser un numero').required(),
})
