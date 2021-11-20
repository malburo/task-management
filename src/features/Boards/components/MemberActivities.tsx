import { Avatar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import activityApi from 'api/activityApi';
import { socketClient } from 'api/socketClient';
import { RootState } from 'app/store';
import { format } from 'date-fns';
import { IActivity } from 'models/activity';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { membersSelector } from '../boardSlice';
import ActivityCard from './ActivityCard';

interface Params {
  boardId: string;
  memberId: string;
}

const MemberActivities = () => {
  const { boardId, memberId } = useParams<Params>();
  const [activityList, setActivityList] = useState<IActivity[]>([]);
  const member = useSelector((state: RootState) => membersSelector.selectById(state, memberId));
  useEffect(() => {
    const fetchActivitiesData = async () => {
      try {
        if (!boardId || !memberId) return;
        const { data } = await activityApi.getByMember({ boardId, memberId });
        setActivityList(data.activities);
      } catch (error) {
        console.log(error);
      }
    };
    fetchActivitiesData();
  }, [boardId, memberId]);

  useEffect(() => {
    (async () => {
      socketClient.on('activity:create', (newActivity: IActivity) => {
        if (newActivity.senderId._id === memberId) setActivityList([newActivity, ...activityList]);
      });
    })();
  }, [activityList, memberId]);
  if (!member) return <Box>loading</Box>;
  return (
    <Box
      padding="24px"
      borderRadius="12px"
      marginX="24px"
      height="calc(90vh - 145px)"
      boxShadow="0 8px 30px rgba(0,0,0,0.12)"
    >
      <Box display="flex" padding="12px" borderRadius="8px">
        <Box>
          <Avatar sx={{ marginRight: '12px', width: '150px', height: '150px' }} src={member.profilePictureUrl} />
        </Box>
        <Box>
          <Typography>{member.fullname}</Typography>
          <Typography>{member.role}</Typography>
        </Box>
      </Box>
      <Box overflow="scroll" height="400px">
        <Typography variant="regular2" sx={{ marginLeft: '12px' }}>
          Last Activity
        </Typography>
        {activityList.map((activity) => {
          if (activity.type === 'BOARD:ADD_MEMBER')
            return (
              <ActivityCard sender={activity.senderId} time={activity.createdAt}>
                <Typography variant="regular2" sx={{ color: '#a9a9a9' }}>
                  {activity.senderId.username} add {activity.content.receiver.username} to this board
                </Typography>
              </ActivityCard>
            );
          if (activity.type === 'TASK:DRAG_DROP')
            return (
              <ActivityCard sender={activity.senderId} time={activity.createdAt}>
                <Typography variant="regular2" sx={{ color: '#a9a9a9' }}>
                  {activity.senderId.username} moved {activity.content.task.title} to column{' '}
                  {activity.content.column.title}
                </Typography>
              </ActivityCard>
            );
          if (activity.type === 'TASK:ASSIGN_MEMBER')
            return (
              <ActivityCard sender={activity.senderId} time={activity.createdAt}>
                <Typography variant="regular2" sx={{ color: '#a9a9a9' }}>
                  {activity.senderId.username} was assigned {activity.content.task.title} to{' '}
                  {activity.content.receiver.username}
                </Typography>
              </ActivityCard>
            );
          if (activity.type === 'TASK:REASSIGN_MEMBER')
            return (
              <ActivityCard sender={activity.senderId} time={activity.createdAt}>
                <Typography variant="regular2" sx={{ color: '#a9a9a9' }}>
                  {activity.senderId.username} was reassigned {activity.content.task.title} to{' '}
                  {activity.content.receiver.username}
                </Typography>
              </ActivityCard>
            );
          if (activity.type === 'TASK:ASSIGN_DEADLINE')
            return (
              <ActivityCard sender={activity.senderId} time={activity.createdAt}>
                <Typography variant="regular2" sx={{ color: '#a9a9a9' }}>
                  {activity.senderId.username} has changed the deadline for {activity.content.task.title} on{' '}
                  {format(new Date(activity.content.deadlineDay), 'dd-MM HH:mm')}
                </Typography>
              </ActivityCard>
            );
          if (activity.type === 'TASK:FINISHED_DEADLINE')
            return (
              <ActivityCard sender={activity.senderId} time={activity.createdAt}>
                <Typography variant="regular2" sx={{ color: '#a9a9a9' }}>
                  {activity.senderId.username} changed the status of {activity.content.task.title} to finished
                </Typography>
              </ActivityCard>
            );
          if (activity.type === 'TASK:UNFINISHED_DEADLINE')
            return (
              <ActivityCard sender={activity.senderId} time={activity.createdAt}>
                <Typography variant="regular2" sx={{ color: '#a9a9a9' }}>
                  {activity.senderId.username} changed the status of {activity.content.task.title} to unfinished
                </Typography>
              </ActivityCard>
            );
          if (activity.type === 'TASK:ADD_COMMENT')
            return (
              <ActivityCard sender={activity.senderId} time={activity.createdAt}>
                <Typography variant="regular2" sx={{ color: '#a9a9a9' }}>
                  {activity.senderId.username} add new comment in {activity.content.task.title}
                </Typography>
              </ActivityCard>
            );
        })}
      </Box>
    </Box>
  );
};

export default MemberActivities;
