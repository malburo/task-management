import { Box, Button, Grid } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import columnApi from 'api/columnApi';
import InputBaseField from 'components/form-control/InputBaseField';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

export interface AddColumnPayload extends AddColumnFormValues {
  boardId: string;
}
interface AddColumnFormValues {
  title: string;
}
interface Params {
  boardId: string;
}

const AddColumn = () => {
  const { boardId } = useParams<Params>();
  const [isToggle, setIsToggle] = useState<boolean>(false);
  const handleClick = () => {
    setIsToggle(true);
  };
  const handleCancel = () => {
    setIsToggle(false);
  };

  const form = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      title: '',
    },
  });

  const onSubmit = async (values: AddColumnFormValues) => {
    try {
      await columnApi.create({ boardId, title: values.title });
    } catch (error) {
      console.log(error);
    }
    setIsToggle(false);
    form.reset();
  };
  return (
    <div>
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
          Add new column
        </Button>
      )}
      {isToggle && (
        <Box width="260px">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Grid container direction="column" justifyContent="center" alignItems="flex-start">
              <InputBaseField form={form} name="title" placeholder="Enter a title for this column..." />
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
    </div>
  );
};

export default AddColumn;
