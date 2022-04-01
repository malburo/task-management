import { yupResolver } from '@hookform/resolvers/yup';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Dialog, DialogActions, IconButton } from '@mui/material';
import InputField from 'components/form-control/InputField';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import * as yup from 'yup';

const schema = yup
  .object()
  .shape({
    name: yup.string().required().min(6).max(35),
  })
  .required();

export interface AddWhiteboardFormValues {
  name: string;
}

interface AddWhiteboardProps {
  onSubmit: (values: AddWhiteboardFormValues) => void;
}

interface Params {
  boardId: string;
}

const AddWhiteboard: React.FC<AddWhiteboardProps> = ({ onSubmit }) => {
  const { boardId } = useParams<Params>();
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoaing] = useState<boolean>(false);
  const form = useForm<any>({
    mode: 'onSubmit',
    defaultValues: {
      name: '',
    },
    resolver: yupResolver(schema),
  });

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (value: any) => {
    try {
      setIsLoaing(true);
      value.boardId = boardId;
      await onSubmit(value);
    } catch (error) {}

    setOpen(false);
    setIsLoaing(false);
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
            <form id="update-form" onSubmit={form.handleSubmit(handleSubmit)}>
              <InputField name="name" form={form} placeholder="Add board title" />
            </form>
          </Box>
          <DialogActions>
            <Button onClick={handleClose} color="inherit">
              Cancel
            </Button>
            <LoadingButton
              type="submit"
              form="update-form"
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

export default AddWhiteboard;
