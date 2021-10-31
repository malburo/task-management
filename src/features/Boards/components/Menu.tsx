import { Avatar, Button, Divider, Drawer, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Box } from '@mui/system';

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const editorRef = useRef<any>(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
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
      <Drawer anchor="right" open={isOpen} onClose={handleClose} variant="persistent">
        <Box sx={{ width: '300px', marginTop: '60px', padding: '24px' }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography>Menu</Typography>
            <Button onClick={handleClose}>close</Button>
          </Box>
          <Divider />

          <Box marginTop="12px">
            <Box marginBottom="12px"></Box>
            <Box display="flex" alignItems="center" marginBottom="24px">
              <Box marginRight="12px">
                <Avatar />
              </Box>
              <Box>
                <Typography variant="bold2" component="p">
                  Tong Quoc Bao
                </Typography>
                <Typography variant="bold1" sx={{ color: '#BDBDBD', marginTop: '4px' }} component="p">
                  on 4 july, 2021
                </Typography>
              </Box>
            </Box>
            <Box marginBottom="12px"></Box>
            <Box>
              <Box marginY="12px">
                <Button onClick={log}>Save</Button>
                <Button>Cancel</Button>
              </Box>
            </Box>
            <Box marginBottom="12px"></Box>

            <Box>
              <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom="12px">
                <Box display="flex" alignItems="center">
                  <Avatar />
                  <Typography variant="bold2" sx={{ marginLeft: '12px' }}>
                    Quoc Bao
                  </Typography>
                </Box>
                <Typography variant="regular1">Admin</Typography>
              </Box>
              <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom="12px">
                <Box display="flex" alignItems="center">
                  <Avatar />
                  <Typography variant="bold2" sx={{ marginLeft: '12px' }}>
                    Quoc Bao
                  </Typography>
                </Box>
                <Typography variant="regular1">Admin</Typography>
              </Box>
              <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom="12px">
                <Box display="flex" alignItems="center">
                  <Avatar />
                  <Typography variant="bold2" sx={{ marginLeft: '12px' }}>
                    Quoc Bao
                  </Typography>
                </Box>
                <Typography variant="regular1">Admin</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
