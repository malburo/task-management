import { Box } from '@mui/material';
import columnApi from 'api/columnApi';
import EditableField from 'components/form-control/EditableField';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface FormValues {
  title: string;
}
interface EditColumnTitleState {
  value: string;
  columnId: string;
}
const EditColumnTitle: React.FC<EditColumnTitleState> = ({ value, columnId }) => {
  const form = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      title: value,
    },
  });
  useEffect(() => {
    form.reset({ title: value });
  }, [form, value]);

  const onSubmit = async ({ title }: FormValues) => {
    if (value === title) return;
    await columnApi.update({ columnId, data: { title } });
  };

  return (
    <Box sx={{ marginLeft: '10px' }}>
      <EditableField form={form} name="title" placeholder="Title..." onBlur={onSubmit} />
    </Box>
  );
};

export default EditColumnTitle;
