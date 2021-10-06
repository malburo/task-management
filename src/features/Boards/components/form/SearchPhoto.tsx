import { Box, Button, CardMedia, Grid, IconButton, Popover, Typography } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import SearchIcon from '@mui/icons-material/Search';
import InputBaseField from 'components/form-control/InputBaseField';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

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
}
interface FormValues {
  search: string;
}
const SearchPhoto: React.FC<SearchPhotoProps> = ({ onSelectPhoto }) => {
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
  return (
    <div>
      <Button
        aria-describedby={id}
        onClick={handleClick}
        variant="contained"
        color="inherit"
        startIcon={<ImageIcon />}
        fullWidth
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
          <Box boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)" borderRadius={2} marginTop={3} marginBottom={5}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <InputBaseField
                placeholder="Keyword..."
                name="search"
                form={form}
                endAdornment={
                  <IconButton color="primary">
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
        </Box>
      </Popover>
    </div>
  );
};

export default SearchPhoto;
