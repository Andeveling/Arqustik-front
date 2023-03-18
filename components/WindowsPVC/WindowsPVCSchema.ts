import * as yup from "yup";

export const WindowsPVCSchema = yup.object().shape({
  title: yup.string().required("El campo es requerido"),
  location: yup.string().required("El campo es requerido"),
  width: yup
    .number()
    .typeError("Este campo debe ser un numero")
    .min(600, "No menor a 600")
    .max(4200, "No mayor a 4200"),
  height: yup
    .number()
    .typeError("Este campo debe ser un numero")
    .min(600, "No menor a 600")
    .max(2400, "No mayor a 2400"),
});
