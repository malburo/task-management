import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { AppDispatch, RootState } from 'app/store';
import { getGeneralRoom, getOneRoom } from 'features/Chat/ReduxSlice/RoomSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import Message from 'features/Chat/component/Message/Message';
import MyMessage from 'features/Chat/component/MyMessage/MyMessage';
import { IMessage } from 'models/messages';
import { messagesSeletor, getMessageInRoom } from 'features/Chat/ReduxSlice/MessagesSlice';
import { IUser } from 'models/user';
import { DateCount } from 'utilities/dateUtil';
import React from 'react';
import useChat from 'hooks/useChat';
import { debounce } from 'lodash';
import Loader from 'features/Chat/component/Loader/Loader';
import ImagePreview from '../ImagePreview';

const useStyle = makeStyles({
  messagesField: {
    height: 'calc(100% - 80px)',
  },
  sendMessageField: {
    height: '80px',
  },
});

interface IParams {
  boardId: string;
  roomId: string;
}

export default function MessageBox() {
  let timeLine = 0;
  const style = useStyle();
  const dispatch = useDispatch<AppDispatch>();

  const { roomId, boardId } = useParams<IParams>();
  const room = useSelector((state: RootState) => state.room.roomInfor);
  const messages = useSelector(messagesSeletor.selectAll);
  const me = useSelector((state: RootState) => state.auth.currentUser) as IUser;
  const [seed, setSeed] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [imageSrc, setImageSrc] = useState<string>('');
  const [openImage, setOpenImage] = useState<boolean>(false);
  const messagesBox = React.useRef<HTMLDivElement>(null);
  // eslint-disable-next-line
  const chat = useChat();

  useEffect(() => {
    if (roomId !== 'all') dispatch(getOneRoom(roomId));
    else dispatch(getGeneralRoom(boardId));

    // eslint-disable-next-line
  }, [roomId, boardId]);

  useEffect(() => {
    setSeed(0);
    if (room._id === '') return;
    setIsLoading(true);
    dispatch(getMessageInRoom({ id: room._id, seed: 0 })).then(() => {
      setIsLoading(false);
      messagesBox.current?.scroll({ top: messagesBox.current.scrollHeight });
    });

    // eslint-disable-next-line
  }, [room]);

  const fetchMoreMsg = (scrollPosition: Number) => {
    (async () => {
      if (scrollPosition !== 0) return;
      if (room._id === '') return;
      setIsLoading(true);
      const positionScroll = messagesBox.current?.scrollHeight || 0;
      await dispatch(getMessageInRoom({ id: room._id, seed: seed + 1 }));
      setIsLoading(false);
      await messagesBox.current?.scroll({ top: messagesBox.current?.scrollHeight - positionScroll });
      setSeed(seed + 1);
    })();
  };

  const debounceCall = debounce((scrollPosition) => fetchMoreMsg(scrollPosition), 500);

  const scrollDetect = (event: React.UIEvent<HTMLDivElement>) => {
    debounceCall(event.currentTarget.scrollTop);
  };

  return (
    <Box
      className={style.messagesField}
      sx={{ overflowX: 'hidden' }}
      ref={messagesBox}
      component="div"
      onScroll={scrollDetect}
    >
      {isLoading && <Loader />}

      <ImagePreview open={openImage} onClose={() => setOpenImage(false)} imageSrc={imageSrc} />
      {messages.map((item: IMessage) => {
        let date = new Date(item.createdAt);
        let renderTimeline = false;
        if (timeLine + DateCount.ONE_DAY < date.getTime()) {
          timeLine = date.getTime();
          renderTimeline = true;
        }
        if (item.postedBy._id !== me._id)
          return (
            <Message
              key={item._id}
              profilePictureUrl={item.postedBy.profilePictureUrl}
              name={item.postedBy.fullname}
              postedDate={date}
              content={item.content}
              renderTimeLine={renderTimeline}
              time={new Date(timeLine)}
              type={item.type ? item.type : 1}
              form={item.form}
              setImageView={setOpenImage}
              setImageSrc={setImageSrc}
            />
          );
        else
          return (
            <MyMessage
              key={item._id}
              profilePictureUrl={item.postedBy.profilePictureUrl}
              postedDate={date}
              content={item.content}
              renderTimeLine={renderTimeline}
              time={new Date(timeLine)}
              _id={item._id}
              form={item.form}
              type={item.type ? item.type : 1}
              setImageView={setOpenImage}
              setImageSrc={setImageSrc}
            />
          );
      })}
    </Box>
  );
}
