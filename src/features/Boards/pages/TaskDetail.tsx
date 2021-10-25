import CloseIcon from '@mui/icons-material/Close';
import GroupIcon from '@mui/icons-material/Group';
import ImageIcon from '@mui/icons-material/Image';
import LabelIcon from '@mui/icons-material/Label';
import {
  Avatar,
  Box,
  Button,
  CardMedia,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import Stack from '@mui/material/Stack';
import { useHistory } from 'react-router';
import DescriptionEditor from '../components/editor/DescriptionEditor';
import SearchPhoto from '../components/form/SearchPhoto';
export default function TaskDetail() {
  const [open, setOpen] = useState(true);
  const [value, setValue] = useState<Date | null>(null);

  const history = useHistory();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    history.push('/boards/616bc72720845003622501e9');
  };

  const handleSelectPhoto = () => {};
  return (
    <Box>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} fullWidth scroll="body">
        <Box sx={{ m: 0, p: '24px' }}>
          <CardMedia
            image="https://mir-s3-cdn-cf.behance.net/project_modules/1400/623df143063739.57e2065f398da.jpg"
            style={{ height: '130px', borderRadius: '12px' }}
          />
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
        </Box>
        <DialogContent>
          <Grid container spacing={4} sx={{ minHeight: '500px' }}>
            <Grid item xs={9}>
              <Box>
                <Box>
                  <Typography variant="regular4">Title</Typography>
                </Box>
                <Typography variant="bold1">In list inprogress</Typography>
              </Box>
              <DescriptionEditor />
            </Grid>
            <Grid item xs={3}>
              <Box>
                <SearchPhoto onSelectPhoto={handleSelectPhoto} />
                {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Stack spacing={3}>
                    <DateTimePicker
                      renderInput={(params) => <TextField {...params} placeholder="deadline date" />}
                      value={value}
                      onChange={(newValue) => {
                        setValue(newValue);
                      }}
                    />
                  </Stack>
                </LocalizationProvider> */}
                <Button
                  variant="contained"
                  color="inherit"
                  startIcon={<LabelIcon />}
                  fullWidth
                  sx={{ justifyContent: 'flex-start', marginTop: '12px' }}
                >
                  Label
                </Button>
                <Button
                  variant="contained"
                  color="inherit"
                  startIcon={<GroupIcon />}
                  fullWidth
                  sx={{ justifyContent: 'flex-start', marginTop: '12px' }}
                >
                  Member
                </Button>
              </Box>
              <Box marginTop="16px">
                <Box display="flex" alignItems="center" marginTop="16px">
                  <Avatar sx={{ marginRight: '16px' }} />
                  <Typography variant="bold2">Quoc Bao</Typography>
                </Box>
                <Box display="flex" alignItems="center" marginTop="16px">
                  <Avatar sx={{ marginRight: '16px' }} />
                  <Typography variant="bold2">Quoc Bao</Typography>
                </Box>
                <Box display="flex" alignItems="center" marginTop="16px">
                  <Avatar sx={{ marginRight: '16px' }} />
                  <Typography variant="bold2">Quoc Bao</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
