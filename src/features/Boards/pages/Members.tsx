import { Avatar, Grid, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import SideBar from 'components/SideBar';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import { membersSelector } from '../boardSlice';
import MemberActivities from '../components/MemberActivities';

interface IParams {
  boardId: string;
  memberId: string;
}

const Members = () => {
  const { boardId } = useParams<IParams>();
  const history = useHistory();
  const members = useSelector(membersSelector.selectAll);

  useEffect(() => {
    if (members.length === 0) return;
    history.push(`/boards/${boardId}/members/${members[0]._id}`);
  }, [boardId, history, members]);

  return (
    <Stack direction="row">
      <SideBar />
      <Box height="100vh" flex={1} overflow="scroll">
        <Box height="65px" />
        <Box padding="48px" display="flex">
          <Grid container spacing={4}>
            <Grid item sm={12} md={4}>
              <Box
                boxShadow="0 8px 30px rgba(0,0,0,0.12)"
                padding="24px"
                borderRadius="12px"
                height="calc(90vh - 145px)"
              >
                <Typography sx={{ fontSize: '20px', fontWeight: '500', margin: '12px 0px 24px 0px' }}>
                  Member {members.length}
                </Typography>
                {members.map((member) => (
                  <Box
                    display="flex"
                    alignItems="center"
                    padding="12px"
                    borderRadius="8px"
                    component={NavLink}
                    to={`/boards/${boardId}/members/${member._id}`}
                    activeStyle={{ color: '#454545', fontWeight: 'bold', backgroundColor: '#F7F6F3' }}
                  >
                    <Box>
                      <Avatar sx={{ marginRight: '12px' }} src={member.profilePictureUrl} />
                    </Box>
                    <Box>
                      <Typography>{member.username}</Typography>
                      <Typography>{member.role}</Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Grid>
            <Grid item sm={12} md={8}>
              <Box>
                <MemberActivities />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Stack>
  );
};

export default Members;
