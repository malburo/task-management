import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import activityApi from 'api/activityApi';
import { socketClient } from 'api/socketClient';
import { IActivity } from 'models/activity';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

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
    <Box padding="24px" borderRadius="12px" marginX="24px" bgcolor="#fff" height="500px" width="300px">
      <Typography variant="regular2">Activities</Typography>
      {activityList.map((activity) => {
        if (activity.type === 'BOARD:ADD_MEMBER') {
          return <Box>{activity.content.sender.username} add member</Box>;
        }
        if (activity.type === 'TASK:DRAG_DROP') {
          return <Box>{activity.content.sender.username} drag drop</Box>;
        }
        if (activity.type === 'TASK:ASSIGN_MEMBER') {
          return (
            <Box>
              {activity.content.sender.username} was assigned {activity.content.task.title} to{' '}
              {activity.content.receiver.username}
            </Box>
          );
        }
        if (activity.type === 'TASK:REASSIGN_MEMBER') {
          return (
            <Box>
              {activity.content.sender.username} was reassigned {activity.content.task.title} to{' '}
              {activity.content.receiver.username}
            </Box>
          );
        }
        if (activity.type === 'TASK:ASSIGN_DEADLINE') {
          return (
            <Box>
              {activity.content.sender.username} was change deadline {activity.content.task.title} in 20-11-2021
            </Box>
          );
        }
        if (activity.type === 'TASK:FINISHED_DEADLINE') {
          return <Box>{activity.content.sender.username} finished dealine</Box>;
        }
        // if (activity.type === 'TASK:UNFINISHED_DEADLINE') {
        //   return (
        //     <Box>
        //       {activity.content.sender.username} was assigned {activity.content.task.title} to{' '}
        //       {activity.content.receiver.username}
        //     </Box>
        //   );
        // }
        if (activity.type === 'TASK:ADD_COMMENT') {
          return (
            <Box>
              {activity.content.sender.username} was assigned {activity.content.task.title} to{' '}
              {activity.content.receiver.username}
            </Box>
          );
        }
      })}
    </Box>
  );
};

export default Activities;
