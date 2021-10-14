import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Button } from '@mui/material';
import { useState } from 'react';

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={handleOpen} variant="contained" color="inherit" startIcon={<MoreHorizIcon />}>
        Show menu
      </Button>
    </>
  );
}
