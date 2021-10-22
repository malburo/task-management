import { Button, Dialog, DialogActions, DialogContent, DialogContentText, MenuItem, Typography } from '@mui/material';
import { Box } from '@mui/system';
import columnApi from 'api/columnApi';
import { useState } from 'react';

interface DeleteColumnState {
  columnId: string;
}
const DeleteColumn: React.FC<DeleteColumnState> = ({ columnId }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleConfirmedDelete = async () => {
    await columnApi.deleteOne({ columnId });
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <MenuItem onClick={handleClickOpen}>
        <Typography variant="regular2" sx={{ color: '#e35555fa' }}>
          Remove Column
        </Typography>
      </MenuItem>
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
              Are you sure delete this Column?
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
    </Box>
  );
};

export default DeleteColumn;
