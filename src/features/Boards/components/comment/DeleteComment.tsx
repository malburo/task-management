import { Button, Dialog, DialogActions, DialogContent, DialogContentText, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';

interface Props {
  onSubmit: () => void;
}
const DeleteComment: React.FC<Props> = ({ onSubmit }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleConfirmedDelete = async () => {
    onSubmit();
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box onClick={handleClickOpen}>
        <Typography variant="regular2" sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
          Delete
        </Typography>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <Box padding="24px">
            <DialogContentText
              id="alert-dialog-description"
              style={{ color: '#afafaf', fontSize: 20, fontWeight: 500 }}
            >
              Are you sure delete this Comment?
            </DialogContentText>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" variant="contained">
            Cancel
          </Button>
          <Button onClick={handleConfirmedDelete} color="primary" variant="contained" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteComment;
