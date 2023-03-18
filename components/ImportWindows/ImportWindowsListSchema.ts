import * as yup from 'yup';

export const ImportWindowsListSchema = yup.object().shape({
  file: yup.mixed().required('Necesitas un archivo .JSON'),
});
