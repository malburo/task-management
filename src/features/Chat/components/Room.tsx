import { Box, Typography } from '@mui/material';
import messageApi from 'api/messageApi';
import roomApi from 'api/roomApi';
import { socketClient } from 'api/socketClient';
import 'emoji-mart/css/emoji-mart.css';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams } from 'react-router-dom';
import MessageForm from './MessageForm';
import MessageList from './MessageList';
import MessageListSkeleton from './skeleton/MessageListSkeleton';

interface Props {}
interface IParams {
  boardId: string;
  roomId: string;
}

const Room: React.FC<Props> = () => {
  const { roomId } = useParams<IParams>();
  const [messageList, setMessageList] = useState([] as any);
  const [pagination, setPagination] = useState<any>({ limit: 8, page: 1 });
  const [roomInfo, setRoomInfo] = useState<any>();

  useEffect(() => {
    (async () => {
      try {
        if (!roomId) return;
        const { data } = await roomApi.getOne({ roomId });
        setRoomInfo(data.room);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [roomId]);

  useEffect(() => {
    (async () => {
      try {
        if (!roomId) return;
        const { data } = await messageApi.getAll({ roomId, params: { limit: 10, page: 1 } });
        setMessageList(data.messages);
        const newFilter = {
          ...data.pagination,
          page: parseInt(data.pagination.page) + 1,
          limit: parseInt(data.pagination.limit),
        };
        setPagination(newFilter);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [roomId]);

  useEffect(() => {
    socketClient.on('messages:create', (newMessage: any) => {
      setMessageList([newMessage, ...messageList]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageList.length]);

  const fetchMoreData = async () => {
    try {
      const { data } = await messageApi.getAll({ roomId, params: pagination });
      const messageListClone = [...messageList, ...data.messages];
      setMessageList(messageListClone);
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

  return (
    <Box bgcolor="#fff">
      <Box p="24px" borderBottom="1px solid #ccc">
        <Typography variant="bold4">{roomInfo?.name}</Typography>
      </Box>
      <Box py={6} px={2} display="flex" flexDirection="column" justifyContent="space-between">
        <Box
          id="scrollableDiv"
          style={{
            overflow: 'auto',
            display: 'flex',
            height: '64vh',
            flexDirection: 'column-reverse',
          }}
        >
          <InfiniteScroll
            dataLength={messageList.length}
            next={fetchMoreData}
            hasMore={Math.ceil(pagination.total / pagination.limit) !== pagination.page - 1}
            loader={<MessageListSkeleton />}
            inverse={true}
            scrollableTarget="scrollableDiv"
            style={{ display: 'flex', flexDirection: 'column-reverse' }}
          >
            <MessageList messageList={messageList} />
          </InfiniteScroll>
        </Box>
      </Box>
      <Box sx={{ zIndex: 9999 }}>
        <MessageForm />
      </Box>
    </Box>
  );
};

export default Room;
