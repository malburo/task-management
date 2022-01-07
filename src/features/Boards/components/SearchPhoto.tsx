import ImageIcon from '@mui/icons-material/Image';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, CardMedia, Grid, IconButton, Popover, Typography } from '@mui/material';
import InputBaseField from 'components/form-control/InputBaseField';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface Photo {
  id: string;
  urls: {
    full: string;
    raw: string;
    regular: string;
    small: string;
    thumb: string;
  };
}

interface SearchPhotoProps {
  onSelectPhoto: (photoUrl: string) => any;
  onUploadPhoto: (photoObj: any) => any;
}

interface FormValues {
  search: string;
}

const SearchPhoto: React.FC<SearchPhotoProps> = ({ onSelectPhoto, onUploadPhoto }) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  const form = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      search: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${values.search}&client_id=W303w_kojjo6CfWav2VMJTtRKB1H2rMKGx6HKxU404Y`
      );
      const photos = await response.json();
      photos.results.pop();
      setPhotos(photos.results);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSelectPhoto = (photoUrl: string) => {
    onSelectPhoto(photoUrl);
    setAnchorEl(null);
  };

  const handleUploadPhoto = async (event: any) => {
    const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];
    const photoObj = event.target.files[0];
    if (!SUPPORTED_FORMATS.includes(photoObj.type)) {
      toast.error('Type file does not support');
      return;
    }
    onUploadPhoto(photoObj);
    const photoUrl = URL.createObjectURL(photoObj);
    onSelectPhoto(photoUrl);
    setAnchorEl(null);
  };
  return (
    <div>
      <Button
        aria-describedby={id}
        onClick={handleClick}
        variant="contained"
        color="secondary"
        startIcon={<ImageIcon />}
        fullWidth
        sx={{ justifyContent: 'flex-start' }}
      >
        Cover
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        sx={{
          marginTop: '12px',
          marginLeft: '8px',
        }}
      >
        <Box padding="16px" minHeight="100px" width="250px">
          <Box>
            <Typography variant="bold2">Photos search</Typography>
          </Box>
          <Box>
            <Typography variant="regular1">Search photos.</Typography>
          </Box>
          <Box boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)" marginTop="12px" marginBottom="24px" borderRadius="8px">
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <InputBaseField
                placeholder="Keyword..."
                name="search"
                form={form}
                sx={{ fontSize: '14px', padding: '4px 12px' }}
                endAdornment={
                  <IconButton color="primary" type="submit">
                    <SearchIcon sx={{ fontSize: '16px' }} />
                  </IconButton>
                }
              />
            </form>
          </Box>
          <Grid container spacing={3}>
            {photos.length > 0 &&
              photos.map((photo) => (
                <Grid item xs={4} key={photo.id}>
                  <CardMedia
                    image={photo.urls.small}
                    sx={{
                      width: '75px',
                      height: '75px',
                      objectFit: 'cover',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      ':hover': {
                        opacity: 0.8,
                      },
                    }}
                    onClick={(e) => handleSelectPhoto(photo.urls.small)}
                  />
                </Grid>
              ))}
          </Grid>
          <Button variant="contained" color="secondary" fullWidth sx={{ marginTop: '12px' }} component="label">
            <input type="file" onChange={handleUploadPhoto} hidden />
            Upload your photo
          </Button>
        </Box>
      </Popover>
    </div>
  );
};

export default SearchPhoto;
