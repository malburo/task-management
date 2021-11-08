import { Box } from '@mui/material';
import taskApi from 'api/taskApi';
import EditableField from 'components/form-control/EditableField';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';

interface FormValues {
  title: string;
}
interface EditTaskTitleState {
  value: string;
}
interface Params {
  boardId: string;
  taskId: string;
}

const EditTaskTitle: React.FC<EditTaskTitleState> = ({ value }) => {
  const { boardId, taskId } = useParams<Params>();
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
    if (title.length === 0 || title.length > 40) {
      form.reset();
      return;
    }
    const payload = { boardId, taskId, data: { title } };
    await taskApi.update(payload);
  };

  return (
    <Box height="30px">
      <EditableField form={form} name="title" placeholder="Title..." onBlur={onSubmit} maxLength={40} />
    </Box>
  );
};

export default EditTaskTitle;
