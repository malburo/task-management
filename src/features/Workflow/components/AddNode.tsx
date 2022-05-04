import { yupResolver } from '@hookform/resolvers/yup';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Dialog, DialogActions, IconButton } from '@mui/material';
import columnApi from 'api/columnApi';
import InputField from 'components/form-control/InputField';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useParams } from 'react-router-dom';

const schema = yup
  .object()
  .shape({
    title: yup.string().required().min(1).max(35),
  })
  .required();

export interface AddColumnFormValues {
  title: string;
}
interface Params {
  boardId: string;
}
const AddNode = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { boardId } = useParams<Params>();
  const form = useForm<AddColumnFormValues>({
    mode: 'onSubmit',
    defaultValues: {
      title: '',
    },
    resolver: yupResolver(schema),
  });

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (values: AddColumnFormValues) => {
    try {
      setIsLoading(true);
      await columnApi.create({ boardId, title: values.title });
      form.reset();
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
    setOpen(false);
  };
  return (
    <Box>
      <Button variant="contained" color="primary" onClick={handleClickOpen} startIcon={<AddIcon />}>
        Add
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        sx={{
          marginBottom: 50,
        }}
      >
        <Box p={6} width="350px">
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 12,
              top: 12,
            }}
          >
            <CloseIcon />
          </IconButton>
          <Box>
            <form id="add-node-form" onSubmit={form.handleSubmit(onSubmit)}>
              <InputField name="title" form={form} placeholder="Add column title" />
            </form>
          </Box>
          <DialogActions>
            <Button onClick={handleClose} color="inherit">
              Cancel
            </Button>
            <LoadingButton
              type="submit"
              form="add-node-form"
              loading={isLoading}
              variant="contained"
              color="primary"
              disabled={isLoading}
            >
              Save
            </LoadingButton>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default AddNode;
