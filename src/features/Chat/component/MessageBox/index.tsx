import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { AppDispatch, RootState } from 'app/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Message from 'features/Chat/component/Message/Message';
import MyMessage from 'features/Chat/component/MyMessage/MyMessage';
import { IMessage } from 'models/messages';
import { messagesSeletor, getMessageInRoom } from 'features/Chat/ReduxSlice/MessagesSlice';
import { IUser } from 'models/user';
import { DateCount } from 'utilities/dateUtil';
import React from 'react';
import useChat from 'hooks/useChat';
import { socketClient } from 'api/socketClient';
import { debounce } from 'lodash';
import Loader from 'features/Chat/component/Loader/Loader';
import 'react-image-lightbox/style.css';
import Lightbox from 'react-image-lightbox';

const useStyle = makeStyles({
  messagesField: {
    height: '100%' /* Handle */,
    '&::-webkit-scrollbar-thumb': {
      background: 'rgb(172, 172, 172)',
      borderRadius: '2px',
    },
  },
  sendMessageField: {
    height: '80px',
  },
});

export default function MessageBox() {
  let timeLine = 0;
  const [seed, setSeed] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [imageSrc, setImageSrc] = useState<string>('');
  const [openImage, setOpenImage] = useState<boolean>(false);
  const messagesBox = React.useRef<HTMLDivElement>(null);

  const style = useStyle();
  const dispatch = useDispatch<AppDispatch>();
  const room = useSelector((state: RootState) => state.room.roomInfor);
  const messages = useSelector(messagesSeletor.selectAll);
  const [isAll, setIsAll] = useState<boolean>(false);
  const me = useSelector((state: RootState) => state.auth.currentUser) as IUser;

  useChat();

  useEffect(() => {
    setSeed(0);
    if (room._id === '') return;
    setIsLoading(true);
    dispatch(getMessageInRoom({ id: room._id, seed: 0 })).then(() => {
      setIsLoading(false);
      messagesBox.current?.scroll({ top: messagesBox.current.scrollHeight });
    });
    // eslint-disable-next-line
  }, [room._id]);

  useEffect(() => {
    if (messages.length % 20 !== 0) setIsAll(true);
    else setIsAll(false);
  }, [messages]);

  useEffect(() => {
    socketClient.on('chat:add-message', () => {
      messagesBox.current?.scroll({ top: messagesBox.current.scrollHeight });
    });
  });

  const fetchMoreMsg = async (scrollPosition: Number) => {
    if (scrollPosition !== 0) return;
    if (room._id === '') return;
    setIsLoading(true);
    const positionScroll = messagesBox.current?.scrollHeight || 0;
    await dispatch(getMessageInRoom({ id: room._id, seed: seed + 1 }));
    setIsLoading(false);
    await messagesBox.current?.scroll({ top: messagesBox.current?.scrollHeight - positionScroll });
    setSeed(seed + 1);
  };

  const debounceCall = debounce((scrollPosition) => fetchMoreMsg(scrollPosition), 500);

  const scrollDetect = (event: React.UIEvent<HTMLDivElement>) => {
    !isAll && debounceCall(event.currentTarget.scrollTop);
  };

  return (
    <>
      {openImage && <Lightbox mainSrc={imageSrc} onCloseRequest={() => setOpenImage(false)} />}
      <Box
        className={style.messagesField}
        sx={{ overflowX: 'hidden' }}
        ref={messagesBox}
        component="div"
        onScroll={scrollDetect}
      >
        {isLoading && <Loader />}
        {isAll && (
          <Typography
            color="#afafaf"
            sx={{
              fontSize: 20,
              fontWeight: 500,
              textAlign: 'center',
              marginTop: 5,
            }}
          >
            That's all messages !!!
          </Typography>
        )}
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
                postedDate={date}
                content={item.content}
                renderTimeLine={renderTimeline}
                time={new Date(timeLine)}
                type={item.type ? item.type : 1}
                form={item.form}
                setImageView={setOpenImage}
                setImageSrc={setImageSrc}
                owner={item.postedBy}
              />
            );
          else
            return (
              <MyMessage
                key={item._id}
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
