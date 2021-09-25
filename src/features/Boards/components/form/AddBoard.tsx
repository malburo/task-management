import { Box, CardMedia, Grid, IconButton } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import InputField from 'components/form-control/InputField';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Visibility from '../Visibility';
import SearchPhoto from './SearchPhoto';

interface FormValues {
  title: string;
  isPrivate: boolean;
  coverUrl: string;
}

const AddBoard = () => {
  const [open, setOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string>('');
  const form = useForm({
    mode: 'onSubmit',
    defaultValues: {
      title: '',
      isPrivate: false,
      coverUrl: '',
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChangeVisibility = (value: boolean) => {
    form.setValue('isPrivate', value);
  };
  const handleSelectPhoto = (photoUrl: string) => {
    setSelectedPhoto(photoUrl);
    form.setValue('coverUrl', photoUrl);
  };
  const onSubmit = (value: FormValues) => {
    console.log(value);
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
          {selectedPhoto ? (
            <CardMedia image={selectedPhoto} style={{ height: '100px', borderRadius: '12px' }} />
          ) : (
            <CardMedia
              image="https://www.viet247.net/images/noimage_food_viet247.jpg"
              style={{ height: '100px', borderRadius: '12px' }}
            />
          )}

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
            <form id="update-form" onSubmit={form.handleSubmit(onSubmit)}>
              <InputField name="title" form={form} placeholder="Add board title" />
            </form>
            <Box marginY={5}>
              <Grid container spacing={4}>
                <Grid item xs={6}>
                  <SearchPhoto onSelectPhoto={handleSelectPhoto} />
                </Grid>
                <Grid item xs={6}>
                  <Visibility onChange={handleChangeVisibility} />
                </Grid>
              </Grid>
            </Box>
          </Box>
          <DialogActions>
            <Button onClick={handleClose} color="inherit">
              Cancel
            </Button>
            <Button type="submit" form="update-form" variant="contained" color="primary">
              Create
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default AddBoard;
