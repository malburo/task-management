import PersonIcon from '@mui/icons-material/Person';
import SecurityIcon from '@mui/icons-material/Security';
import { Container, Grid, List, ListItem, ListItemButton, Paper } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Box } from '@mui/system';
import { RootState } from 'app/store';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import EditAvatar from '../component/form/EditAvatar';
import EditFullname from '../component/form/EditFullname';
import EditUsername from '../component/form/EditUsername';

const Profile = () => {
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  if (!currentUser) return <p>Loading...</p>;
  return (
    <Paper>
      <Container>
        <Grid container sx={{ marginTop: '65px', paddingTop: '48px' }}>
          <Grid item xs={3}>
            <Box position="sticky" top="80px">
              <List>
                <ListItem
                  component={NavLink}
                  to="/profile/general"
                  style={{ color: '#ccc' }}
                  activeStyle={{ color: 'black', fontWeight: 'bold' }}
                >
                  <ListItemButton>
                    <ListItemIcon sx={{ color: 'inherit' }}>
                      <PersonIcon />
                    </ListItemIcon>
                    <span>General</span>
                  </ListItemButton>
                </ListItem>
                <ListItem
                  component={NavLink}
                  to="/profile/security"
                  style={{ color: '#ccc' }}
                  activeStyle={{ color: 'black', fontWeight: 'bold' }}
                >
                  <ListItemButton>
                    <ListItemIcon sx={{ color: 'inherit' }}>
                      <SecurityIcon />
                    </ListItemIcon>
                    <span>Security</span>
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
          </Grid>
          <Grid item xs={9}>
            <EditAvatar userId={currentUser._id} value={currentUser.profilePictureUrl} />
            <EditFullname userId={currentUser._id} value={currentUser.fullname} />
            <EditUsername userId={currentUser._id} value={currentUser.username} />
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
};

export default Profile;
