import * as yup from 'yup';
export const createColumnScheme = yup
  .object()
  .shape({
    title: yup
      .string()
      .required('Please enter title')
      .min(2, 'Please enter at least 2 characters')
      .max(200, 'Please enter up to 200 characters'),
  })
  .required();

export const createTaskScheme = yup
  .object()
  .shape({
    title: yup
      .string()
      .required('Please enter title')
      .min(2, 'Please enter at least 2 characters')
      .max(200, 'Please enter up to 200 characters'),
    column: yup.string().required('Please choose title'),
  })
  .required();

export interface AddColumnFormValues {
  title: string;
}

export interface AddTaskFormValues {
  title: string;
  column: string;
}
