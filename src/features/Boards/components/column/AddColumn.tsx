import { Box, Button, Card, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
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
          color="secondary"
          endIcon={<AddIcon />}
          sx={{
            borderRadius: '8px',
            height: '32px',
            width: '260px',
            padding: '8px 15px',
            boxShadow: 'none',
            margin: '0px 24px 0px 48px',
            justifyContent: 'space-between',
          }}
        >
          Add new column
        </Button>
      )}
      {isToggle && (
        <Card elevation={0} sx={{ width: '280px', marginX: '48px', bgcolor: 'secondary.main' }}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Grid container direction="column" justifyContent="center" alignItems="flex-start">
              <InputBaseField form={form} name="title" placeholder="Enter a title for this column..." autoFocus />
              <Box display="flex" alignItems="center" justifyContent="flex-end" width="100%" marginTop="12px">
                <Button variant="contained" color="secondary" onClick={handleCancel} style={{ marginRight: 12 }}>
                  cancel
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  save
                </Button>
              </Box>
            </Grid>
          </form>
        </Card>
      )}
    </div>
  );
};

export default AddColumn;
