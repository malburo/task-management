import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import activityApi from 'api/activityApi';
import { socketClient } from 'api/socketClient';
import { format } from 'date-fns';
import { IActivity } from 'models/activity';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ActivityCard from './ActivityCard';

interface Params {
  boardId: string;
}

const Activities = () => {
  const { boardId } = useParams<Params>();
  const [activityList, setActivityList] = useState<IActivity[]>([]);

  useEffect(() => {
    const fetchActivitiesData = async () => {
      try {
        const { data } = await activityApi.getAllActivitiesInBoard({ boardId });
        setActivityList(data.activities);
      } catch (error) {
        console.log(error);
      }
    };
    fetchActivitiesData();
  }, [boardId]);

  useEffect(() => {
    (async () => {
      socketClient.on('activity:create', (newActivity: IActivity) => {
        setActivityList([newActivity, ...activityList]);
      });
    })();
  }, [activityList]);

  return (
    <Box
      padding="24px"
      borderRadius="12px"
      marginX="24px"
      height="calc(90vh - 145px)"
      overflow="scroll"
      boxShadow="0 8px 30px rgba(0,0,0,0.12)"
    >
      <Typography variant="regular2">Activities</Typography>
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
  );
};

export default Activities;
