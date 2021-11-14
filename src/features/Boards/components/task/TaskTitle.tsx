import SubtitlesIcon from '@mui/icons-material/Subtitles';
import { Box, Typography } from '@mui/material';
import taskApi from 'api/taskApi';
import EditableField from 'components/form-control/EditableField';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';

interface FormValues {
  title: string;
}
interface Props {
  value: string;
}
interface Params {
  boardId: string;
  taskId: string;
}

const TaskTitle: React.FC<Props> = ({ value }) => {
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
    <>
      <Box display="flex" alignItems="center" color="#BDBDBD" marginBottom="12px" height="30px">
        <SubtitlesIcon sx={{ width: '20px', height: '20px', marginRight: '4px' }} />
        <Typography variant="regular2" sx={{ marginRight: '4px' }}>
          Title
        </Typography>
      </Box>
      <Box height="30px" bgcolor="#f7f7f7b0" borderRadius="8px" padding="12px">
        <EditableField form={form} name="title" placeholder="Title..." onBlur={onSubmit} maxLength={40} />
      </Box>
    </>
  );
};

export default TaskTitle;
