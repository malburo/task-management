import ChatIcon from '@mui/icons-material/Chat';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import { List, ListItem, Stack, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/system';
import { useHistory, useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import Logo from '../images/Logo-small.svg';

interface IParams {
  boardId: string;
}

export default function SideBar() {
  const { boardId } = useParams<IParams>();
  const history = useHistory();
  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        paddingX: '24px',
        width: { sm: '60px', md: '200px' },
        height: '100vh',
        bgcolor: '#fff',
        zIndex: 1000,
      }}
    >
      <Stack direction="row" alignItems="center" margin="24px">
        <img src={Logo} alt="logo" onClick={() => history.push('/')} style={{ cursor: 'pointer' }} />
        <Typography variant="semiBold5" sx={{ marginX: 4, display: { xs: 'none', md: 'block' } }}>
          Tasker
        </Typography>
      </Stack>
      <List>
        <ListItem
          component={NavLink}
          to={`/boards/${boardId}/dashboard`}
          activeStyle={{ color: '#454545', fontWeight: 'bold' }}
          sx={{ padding: '4px 8px', color: '#ccc' }}
        >
          <Box
            display="flex"
            alignItems="center"
            width="100%"
            padding="12px"
            borderRadius="4px"
            sx={{ '&:hover': { backgroundColor: '#ebebeb', color: '#454545' } }}
          >
            <InsertChartIcon />
            <Typography variant="regular3" sx={{ marginLeft: '24px', display: { xs: 'none', md: 'block' } }}>
              General
            </Typography>
          </Box>
        </ListItem>
        <ListItem
          component={NavLink}
          exact
          to={`/boards/${boardId}`}
          activeStyle={{ color: '#454545', fontWeight: 'bold' }}
          sx={{ padding: '4px 8px', color: '#ccc' }}
        >
          <Box
            display="flex"
            alignItems="center"
            width="100%"
            padding="12px"
            borderRadius="4px"
            sx={{ '&:hover': { backgroundColor: '#ebebeb', color: '#454545' } }}
          >
            <DashboardIcon />
            <Typography variant="regular3" sx={{ marginLeft: '24px', display: { xs: 'none', md: 'block' } }}>
              Board
            </Typography>
          </Box>
        </ListItem>
        <ListItem
          component={NavLink}
          to={`/boards/${boardId}/rooms/all`}
          activeStyle={{ color: '#454545', fontWeight: 'bold' }}
          sx={{ padding: '4px 8px', color: '#ccc' }}
        >
          <Box
            display="flex"
            alignItems="center"
            width="100%"
            padding="12px"
            borderRadius="4px"
            sx={{ '&:hover': { backgroundColor: '#ebebeb', color: '#454545' } }}
          >
            <ChatIcon />
            <Typography variant="regular3" sx={{ marginLeft: '24px', display: { xs: 'none', md: 'block' } }}>
              Messages
            </Typography>
          </Box>
        </ListItem>
        <ListItem
          component={NavLink}
          to={`/boards/${boardId}/members`}
          activeStyle={{ color: '#454545', fontWeight: 'bold' }}
          sx={{ padding: '4px 8px', color: '#ccc' }}
        >
          <Box
            display="flex"
            alignItems="center"
            width="100%"
            padding="12px"
            borderRadius="4px"
            sx={{ '&:hover': { backgroundColor: '#ebebeb', color: '#454545' } }}
          >
            <GroupIcon />
            <Typography variant="regular3" sx={{ marginLeft: '24px', display: { xs: 'none', md: 'block' } }}>
              Members
            </Typography>
          </Box>
        </ListItem>
      </List>
    </Paper>
  );
}
