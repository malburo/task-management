import { Avatar, Grid, Paper, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
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
    if (
      history.location.pathname === `/boards/${boardId}/members` ||
      history.location.pathname === `/boards/${boardId}/members/`
    )
      history.push(`/boards/${boardId}/members/${members[0]._id}`);
  }, [boardId, history, members]);

  return (
    <Box padding="48px">
      <Grid container spacing={4}>
        <Grid item sm={12} md={4}>
          <Box boxShadow="0 8px 30px rgba(0,0,0,0.12)" padding="24px" borderRadius="12px" height="calc(90vh - 145px)">
            <Typography sx={{ fontSize: '20px', fontWeight: '500', margin: '12px 0px 24px 0px' }}>
              Member {members.length}
            </Typography>
            {members.map((member) => (
              <Box
                key={member._id}
                display="flex"
                alignItems="center"
                padding="12px"
                borderRadius="8px"
                component={NavLink}
                to={`/boards/${boardId}/members/${member._id}`}
                activeStyle={{ fontWeight: 'bold', opacity: 1, backgroundColor: '#F7F6F3' }}
                sx={{ padding: '24px', color: 'text.primary', opacity: 0.5 }}
              >
                <Box>
                  <Avatar sx={{ marginRight: '12px' }} src={member.profilePictureUrl} />
                </Box>
                <Box>
                  <Typography>{member.username}</Typography>
                  <Typography>{member.role?.toLocaleLowerCase()}</Typography>
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
  );
};

export default Members;
