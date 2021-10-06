import { Box, Button, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import taskApi from 'api/taskApi';
import InputBaseField from 'components/form-control/InputBaseField';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export interface AddTaskPayload extends FormValues {
  columnId: string;
}

interface FormValues {
  title: string;
}

interface Props {
  columnId: string;
}

const AddTask: React.FC<Props> = ({ columnId }) => {
  const [isToggle, setIsToggle] = useState<boolean>(false);
  const handleClick = () => {
    setIsToggle(true);
  };
  const handleCancel = () => {
    setIsToggle(false);
  };

  const form = useForm<FormValues>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      title: '',
    },
  });
  const onSubmit = async (values: FormValues) => {
    await taskApi.create({ columnId, ...values });
    setIsToggle(false);
    form.reset();
  };
  return (
    <>
      {isToggle || (
        <Button
          onClick={handleClick}
          variant="contained"
          endIcon={<AddIcon />}
          sx={{
            background: '#DAE4FD',
            borderRadius: '8px',
            color: '#2F80ED',
            height: '32px',
            width: '260px',
            padding: '8px 15px',
            boxShadow: 'none',
            span: {
              justifyContent: 'space-between',
            },
          }}
        >
          Add another card
        </Button>
      )}
      {isToggle && (
        <Box width="260px">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Grid container direction="column" justifyContent="center" alignItems="flex-start">
              <InputBaseField form={form} name="title" placeholder="Enter a title for this task..." />
              <Box display="flex" alignItems="center" justifyContent="flex-end" width="100%" marginTop="12px">
                <Button type="submit" variant="contained" color="primary" style={{ marginRight: 12 }}>
                  save
                </Button>
                <Button variant="contained" color="secondary" onClick={handleCancel}>
                  cancel
                </Button>
              </Box>
            </Grid>
          </form>
        </Box>
      )}
    </>
  );
};

export default AddTask;
