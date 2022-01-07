import { Box, Button, Card, Grid } from '@mui/material';
import taskApi from 'api/taskApi';
import InputBaseField from 'components/form-control/InputBaseField';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

export interface AddTaskPayload extends FormValues {
  columnId: string;
  boardId: string;
}

interface FormValues {
  title: string;
}

interface Props {
  columnId: string;
  setShowAddTaskForm: any;
}
interface Params {
  boardId: string;
}
const AddTask: React.FC<Props> = ({ columnId, setShowAddTaskForm }) => {
  const { boardId } = useParams<Params>();
  const form = useForm<FormValues>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      title: '',
    },
  });
  const onSubmit = async (values: FormValues) => {
    const payload = { boardId, columnId, ...values };
    await taskApi.create(payload);
    setShowAddTaskForm(false);
    form.reset();
  };
  return (
    <Card sx={{ marginBottom: '12px' }}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Grid container direction="column" justifyContent="center" alignItems="flex-start">
          <InputBaseField form={form} name="title" placeholder="Enter a title for this task..." autoFocus />
          <Box display="flex" alignItems="center" justifyContent="flex-end" width="100%" marginTop="12px">
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setShowAddTaskForm(false)}
              style={{ marginRight: 12 }}
            >
              cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              save
            </Button>
          </Box>
        </Grid>
      </form>
    </Card>
  );
};

export default AddTask;
