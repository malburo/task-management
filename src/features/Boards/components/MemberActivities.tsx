/* eslint-disable array-callback-return */
// eslint-disable-next-line react-hooks/exhaustive-deps
import { Avatar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import activityApi from 'api/activityApi';
import { socketClient } from 'api/socketClient';
import { RootState } from 'app/store';
import { format } from 'date-fns';
import { IActivity } from 'models/activity';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
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
  const [pagination, setPagination] = useState<any>({ limit: 8, page: 1 });

  useEffect(() => {
    const fetchActivitiesData = async () => {
      try {
        if (!boardId || !memberId) return;
        const { data } = await activityApi.getByMember({ boardId, memberId }, { limit: 8, page: 1 });
        setActivityList(data.activities);
        const newFilter = {
          ...data.pagination,
          page: parseInt(data.pagination.page) + 1,
          limit: parseInt(data.pagination.limit),
        };
        setPagination(newFilter);
      } catch (error) {
        console.log(error);
      }
    };
    fetchActivitiesData();
  }, [boardId, memberId]);

  const fetchMoreData = async () => {
    try {
      const { data } = await activityApi.getByMember({ boardId, memberId }, pagination);
      const activityListClone = [...activityList];
      const newActivityList = activityListClone.concat(data.activities);
      setActivityList(newActivityList);
      const newFilter = {
        ...data.pagination,
        page: parseInt(data.pagination.page) + 1,
        limit: parseInt(data.pagination.limit),
      };
      setPagination(newFilter);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      socketClient.on('activity:create', (newActivity: IActivity) => {
        if (newActivity.senderId._id === memberId) setActivityList((prev) => [newActivity, ...prev]);
      });
    })();
  }, [memberId]);
  if (!member) return <Box>loading</Box>;

  return (
    <Box padding="24px" borderRadius="12px" boxShadow="0 8px 30px rgba(0,0,0,0.12)">
      <Box display="flex" padding="12px" borderRadius="8px">
        <Box>
          <Avatar sx={{ marginRight: '12px', width: '150px', height: '150px' }} src={member.profilePictureUrl} />
        </Box>
        <Box>
          <Typography>{member.fullname}</Typography>
          <Typography>{member.role}</Typography>
        </Box>
      </Box>
      <Box>
        <Typography variant="regular2" sx={{ marginLeft: '12px' }}>
          Last Activity
        </Typography>
        {pagination.total && (
          <InfiniteScroll
            dataLength={activityList.length}
            next={fetchMoreData}
            hasMore={
              activityList.length !== 0 && Math.ceil(pagination.total / pagination.limit) !== pagination.page - 1
            }
            height="calc(90vh - 345px)"
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {activityList.map((activity) => {
              if (activity.type === 'BOARD:ADD_MEMBER')
                return (
                  <ActivityCard sender={activity.senderId} time={activity.createdAt} key={activity._id}>
                    <Typography variant="regular2" sx={{ color: '#a9a9a9' }}>
                      {activity.senderId.username} add {activity.content.receiver.username} to this board
                    </Typography>
                  </ActivityCard>
                );
              if (activity.type === 'TASK:DRAG_DROP')
                return (
                  <ActivityCard sender={activity.senderId} time={activity.createdAt} key={activity._id}>
                    <Typography variant="regular2" sx={{ color: '#a9a9a9' }}>
                      {activity.senderId.username} moved {activity.content.task.title} to column{' '}
                      {activity.content.column.title}
                    </Typography>
                  </ActivityCard>
                );
              if (activity.type === 'TASK:ASSIGN_MEMBER')
                return (
                  <ActivityCard sender={activity.senderId} time={activity.createdAt} key={activity._id}>
                    <Typography variant="regular2" sx={{ color: '#a9a9a9' }}>
                      {activity.senderId.username} was assigned {activity.content.task.title} to{' '}
                      {activity.content.receiver.username}
                    </Typography>
                  </ActivityCard>
                );
              if (activity.type === 'TASK:REASSIGN_MEMBER')
                return (
                  <ActivityCard sender={activity.senderId} time={activity.createdAt} key={activity._id}>
                    <Typography variant="regular2" sx={{ color: '#a9a9a9' }}>
                      {activity.senderId.username} was reassigned {activity.content.task.title} to{' '}
                      {activity.content.receiver.username}
                    </Typography>
                  </ActivityCard>
                );
              if (activity.type === 'TASK:ASSIGN_DEADLINE')
                return (
                  <ActivityCard sender={activity.senderId} time={activity.createdAt} key={activity._id}>
                    <Typography variant="regular2" sx={{ color: '#a9a9a9' }}>
                      {activity.senderId.username} has changed the deadline for {activity.content.task.title} on{' '}
                      {format(new Date(activity.content.deadlineDay), 'dd-MM HH:mm')}
                    </Typography>
                  </ActivityCard>
                );
              if (activity.type === 'TASK:FINISHED_DEADLINE')
                return (
                  <ActivityCard sender={activity.senderId} time={activity.createdAt} key={activity._id}>
                    <Typography variant="regular2" sx={{ color: '#a9a9a9' }}>
                      {activity.senderId.username} changed the status of {activity.content.task.title} to finished
                    </Typography>
                  </ActivityCard>
                );
              if (activity.type === 'TASK:UNFINISHED_DEADLINE')
                return (
                  <ActivityCard sender={activity.senderId} time={activity.createdAt} key={activity._id}>
                    <Typography variant="regular2" sx={{ color: '#a9a9a9' }}>
                      {activity.senderId.username} changed the status of {activity.content.task.title} to unfinished
                    </Typography>
                  </ActivityCard>
                );
              if (activity.type === 'TASK:ADD_COMMENT')
                return (
                  <ActivityCard sender={activity.senderId} time={activity.createdAt} key={activity._id}>
                    <Typography variant="regular2" sx={{ color: '#a9a9a9' }}>
                      {activity.senderId.username} add new comment in {activity.content.task.title}
                    </Typography>
                  </ActivityCard>
                );
            })}
          </InfiniteScroll>
        )}
      </Box>
    </Box>
  );
};

export default MemberActivities;
