import GifBoxIcon from '@mui/icons-material/GifBox';
import SearchIcon from '@mui/icons-material/Search';
import { Box, CardMedia, Grid, IconButton, Popover, Typography } from '@mui/material';
import messageApi from 'api/messageApi';
import InputBaseField from 'components/form-control/InputBaseField';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

interface IParams {
  boardId: string;
  roomId: string;
}

interface GifPickerProps {}

interface FormValues {
  search: string;
}

const GifPicker: React.FC<GifPickerProps> = () => {
  const { roomId } = useParams<IParams>();
  const [photos, setPhotos] = useState<any[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'gif-picker' : undefined;

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
        `https://api.giphy.com/v1/gifs/search?api_key=vAMwnX5DHrKwDAbnYAcpmc5ABtDsROWl&limit=9&q=${values.search}`
      );
      const gifs = await response.json();
      setPhotos(gifs.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSelectPhoto = async (gifUrl: string) => {
    console.log(gifUrl);
    const payload = { roomId, content: gifUrl, type: 'IMAGE' };
    await messageApi.create(payload);
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton aria-label="Emoji" onClick={handleClick}>
        <GifBoxIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Box padding="16px" minHeight="100px" width="250px">
          <Box>
            <Typography variant="bold2">Giphy search</Typography>
          </Box>
          <Box>
            <Typography variant="regular1">Search gif photo.</Typography>
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
                    image={photo.images.original.url}
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
                    onClick={(e) => handleSelectPhoto(photo.images.original.url)}
                  />
                </Grid>
              ))}
          </Grid>
        </Box>
      </Popover>
    </div>
  );
};

export default GifPicker;
