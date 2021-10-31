import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';
import { Box, Button, CardMedia, Dialog, DialogActions, Grid, IconButton } from '@mui/material';
import uploadApi from 'api/uploadApi';
import InputField from 'components/form-control/InputField';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Visibility from '../Visibility';
import SearchPhoto from './SearchPhoto';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup
  .object()
  .shape({
    title: yup.string().required().min(6).max(35),
    isPrivate: yup.boolean().required(),
    coverUrl: yup.string(),
  })
  .required();

export interface AddBoardFormValues {
  title: string;
  isPrivate: boolean;
  coverUrl: string;
}

interface AddBoardProps {
  onSubmit: (values: AddBoardFormValues) => void;
}

const AddBoard: React.FC<AddBoardProps> = ({ onSubmit }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoaing] = useState<boolean>(false);
  const [coverUrl, setCoverUrl] = useState<string>('');
  const [coverObj, setCoverObj] = useState<any>();
  const form = useForm<AddBoardFormValues>({
    mode: 'onSubmit',
    defaultValues: {
      title: '',
      isPrivate: false,
      coverUrl: '',
    },
    resolver: yupResolver(schema),
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
    setCoverUrl(photoUrl);
    form.setValue('coverUrl', photoUrl);
  };
  const handleUploadPhoto = (photoObj: any) => {
    setCoverObj(photoObj);
  };
  const handleSubmit = async (value: AddBoardFormValues) => {
    setIsLoaing(true);
    if (coverUrl.includes('blob')) {
      let formData = new FormData();
      formData.append('image', coverObj);
      const { data } = await uploadApi.upload(formData);
      form.setValue('coverUrl', data.result.secure_url);
      value.coverUrl = data.result.secure_url;
    }
    await onSubmit(value);
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
          {coverUrl ? (
            <CardMedia image={coverUrl} style={{ height: '100px', borderRadius: '12px' }} />
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
            <form id="update-form" onSubmit={form.handleSubmit(handleSubmit)}>
              <InputField name="title" form={form} placeholder="Add board title" />
            </form>
            <Box marginY={5}>
              <Grid container spacing={4}>
                <Grid item xs={6}>
                  <SearchPhoto onSelectPhoto={handleSelectPhoto} onUploadPhoto={handleUploadPhoto} />
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

export default AddBoard;
