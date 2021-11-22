import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { AppDispatch, RootState } from 'app/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import MyMessage from 'features/Chat/component/MyMessage/MyMessage';
import { IMessage } from 'models/messages';
import { messagesSeletor, getMessageInRoom } from 'features/Chat/ReduxSlice/MessagesSlice';
import { IUser } from 'models/user';
import { DateCount } from 'utilities/dateUtil';
import React from 'react';
import useChat from 'hooks/useChat';
import { socketClient } from 'api/socketClient';
import Loader from 'features/Chat/component/Loader/Loader';
import 'react-image-lightbox/style.css';
import Lightbox from 'react-image-lightbox';
import BotMessage from '../BotMessage';

const useStyle = makeStyles({
  messagesField: {
    height: '100%',
    '&::-webkit-scrollbar-thumb': {
      background: 'rgb(172, 172, 172)',
      borderRadius: '2px',
    },
  },
  sendMessageField: {
    height: '80px',
  },
});

export default function BotMessageBox() {
  let timeLine = 0;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [imageSrc, setImageSrc] = useState<string>('');
  const [openImage, setOpenImage] = useState<boolean>(false);
  const messagesBox = React.useRef<HTMLDivElement>(null);

  const style = useStyle();
  const dispatch = useDispatch<AppDispatch>();
  const room = useSelector((state: RootState) => state.room.roomInfor);
  const messages = useSelector(messagesSeletor.selectAll);
  const me = useSelector((state: RootState) => state.auth.currentUser) as IUser;

  useChat();

  useEffect(() => {
    if (room._id === '') return;
    setIsLoading(true);
    dispatch(getMessageInRoom({ id: room._id, seed: 0 })).then(() => {
      setIsLoading(false);
      messagesBox.current?.scroll({ top: messagesBox.current.scrollHeight });
    });
    // eslint-disable-next-line
  }, [room._id]);

  useEffect(() => {
    socketClient.on('chat:add-message', () => {
      messagesBox.current?.scroll({ top: messagesBox.current.scrollHeight + 10000 });
    });
  });

  return (
    <>
      {openImage && <Lightbox mainSrc={imageSrc} onCloseRequest={() => setOpenImage(false)} />}
      <Box className={style.messagesField} sx={{ overflowX: 'hidden' }} ref={messagesBox} component="div">
        {isLoading && <Loader />}
        {messages.map((item: IMessage) => {
          let date = new Date(item.createdAt);
          let renderTimeline = false;
          if (timeLine + DateCount.ONE_DAY < date.getTime()) {
            timeLine = date.getTime();
            renderTimeline = true;
          }
          if (item.postedBy._id !== me._id)
            return (
              <BotMessage
                key={item._id}
                postedDate={date}
                content={item.content}
                renderTimeLine={renderTimeline}
                time={new Date(timeLine)}
                type={item.type ? item.type : 1}
                form={item.form}
                owner={item.postedBy}
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
    </>
  );
}
