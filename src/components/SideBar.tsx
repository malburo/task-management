import ChatIcon from '@mui/icons-material/Chat';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HistoryIcon from '@mui/icons-material/History';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import PeopleIcon from '@mui/icons-material/People';
import { Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import * as React from 'react';
export default function SideBar() {
  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: '80px 24px 24px 24px',
        width: '200px',
        height: 'calc(100vh - 105px)',
        bgcolor: '#f8f9fd',
        zIndex: 1000,
      }}
    >
      <MenuList>
        <MenuItem sx={{ width: '100%' }}>
          <InsertChartIcon fontSize="small" sx={{ fill: '#4F4F4F' }} />
          <Typography variant="regular3">General</Typography>
        </MenuItem>
        <MenuItem sx={{ width: '100%' }}>
          <DashboardIcon fontSize="small" sx={{ fill: '#4F4F4F' }} />
          <Typography variant="regular3">Board</Typography>
        </MenuItem>
        <MenuItem sx={{ width: '100%' }}>
          <ChatIcon fontSize="small" sx={{ fill: '#4F4F4F' }} />
          <Typography variant="regular3">Messages</Typography>
        </MenuItem>
        <MenuItem sx={{ width: '100%' }}>
          <HistoryIcon fontSize="small" sx={{ fill: '#4F4F4F' }} />
          <Typography variant="regular3">Activity</Typography>
        </MenuItem>
        <MenuItem sx={{ width: '100%' }}>
          <PeopleIcon fontSize="small" sx={{ fill: '#4F4F4F' }} />
          <Typography variant="regular3">Members</Typography>
        </MenuItem>
      </MenuList>
    </Paper>
  );
}
