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
      {activityList.map((activity) => (
        <Box>"asd"</Box>
      ))}
    </Box>
  );
};

export default Activities;
