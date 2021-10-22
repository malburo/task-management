import { Box, Button, Card, Grid } from '@mui/material';
import taskApi from 'api/taskApi';
import InputBaseField from 'components/form-control/InputBaseField';
import React from 'react';
import { useForm } from 'react-hook-form';

export interface AddTaskPayload extends FormValues {
  columnId: string;
}

interface FormValues {
  title: string;
}

interface Props {
  columnId: string;
  setShowAddTaskForm: any;
}

const AddTask: React.FC<Props> = ({ columnId, setShowAddTaskForm }) => {
  const form = useForm<FormValues>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      title: '',
    },
  });
  const onSubmit = async (values: FormValues) => {
    await taskApi.create({ columnId, ...values });
    setShowAddTaskForm(false);
    form.reset();
  };
  return (
    <Card sx={{ marginBottom: '12px' }}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Grid container direction="column" justifyContent="center" alignItems="flex-start">
          <InputBaseField form={form} name="title" placeholder="Enter a title for this task..." autoFocus />
          <Box display="flex" alignItems="center" justifyContent="flex-end" width="100%" marginTop="12px">
            <Button type="submit" variant="contained" color="primary" style={{ marginRight: 12 }}>
              save
            </Button>
            <Button variant="contained" color="secondary" onClick={() => setShowAddTaskForm(false)}>
              cancel
            </Button>
          </Box>
        </Grid>
      </form>
    </Card>
  );
};

export default AddTask;
