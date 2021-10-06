import React from 'react';
import Message from '../Message/Message';
import MyMessage from '../MyMessage/MyMessage';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ChatRoomStyle from './ChatRoomStyle';
import { useDispatch, useSelector } from 'react-redux';
import { setAnyRoom, setMenuOpen } from 'features/Chat/ReduxSlice/SidebarAppChatSlice';
import { AppDispatch, RootState } from 'app/store';
import { IMessage } from 'models/messages';
import { Button, CircularProgress, Hidden, IconButton, Typography } from '@mui/material';
import ListIcon from '@mui/icons-material/List';
import SendIcon from '@mui/icons-material/Send';
import { getOneRoom } from 'features/Chat/ReduxSlice/RoomSlice';
import { Box } from '@mui/system';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { getMessageInRoom, messagesSeletor } from 'features/Chat/ReduxSlice/MessagesSlice';
import useChat from 'features/Chat/customHook/useChat';
import { DateCount } from 'utilities/dateUtil';

export interface IParamChatRoom {
  id: string;
}

const scheme = yup
  .object()
  .shape({
    msgContent: yup.string().required('Please enter message').max(100, 'Please enter up to 100 characters'),
  })
  .required();

interface IInputMessage {
  msgContent: string;
}

const ChatRoom: React.FC = () => {
  let timeLine = 0;
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<IParamChatRoom>();
  const style = ChatRoomStyle();
  const myRef = React.useRef<HTMLDivElement>(null);
  const room = useSelector((state: RootState) => state.room.roomInfor);
  const idLoading = useSelector((state: RootState) => state.room.isLoading);
  const messages = useSelector(messagesSeletor.selectAll);
  const seed = useSelector((state: RootState) => state.message.seed);
  const { sendMessage } = useChat();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IInputMessage>({
    resolver: yupResolver(scheme),
  });

  useEffect(() => {
    dispatch(setAnyRoom(true));
    dispatch(setMenuOpen(false));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(getOneRoom({ id }));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getMessageInRoom({ id: room._id, seed: seed }));
    myRef.current?.scrollIntoView();
    // eslint-disable-next-line
  }, [room]);

  useEffect(() => {
    myRef.current?.scrollIntoView();
    // eslint-disable-next-line
  }, [messages]);

  const clickHandler = () => {
    dispatch(setMenuOpen(true));
  };

  const sendMessageHandler = (data: IInputMessage) => {
    sendMessage(data.msgContent);
    reset();
  };

  return (
    <React.Fragment>
      <div className={style.roomHeader}>
        <Hidden mdUp>
          <IconButton className={style.menuIcon} aria-label="open-menu" onClick={clickHandler}>
            <ListIcon />
          </IconButton>
        </Hidden>
        <Typography variant="subtitle1" className={style.roomTitle}>
          {room?.name}
        </Typography>
      </div>
      {idLoading && (
        <Box
          sx={{
            display: 'flex',
            position: 'fixed',
            width: '100%',
            // eslint-disable-next-line
            ['@media (min-width: 900px)']: {
              marginLeft: '36%',
            },
            // eslint-disable-next-line
            ['@media (max-width: 900px)']: {
              justifyContent: 'space-around',
            },
          }}
        >
          <CircularProgress />
        </Box>
      )}
      <div className={style.chatRoom}>
        {messages.map((item: IMessage) => {
          let date = new Date(item.createdAt);
          let renderTimeline = false;
          if (timeLine + DateCount.ONE_DAY < date.getTime()) {
            timeLine = date.getTime();
            renderTimeline = true;
          }
          if (!item.isMe)
            return (
              <Message
                key={item._id}
                profilePictureUrl={item.postedBy.profilePictureUrl}
                name={item.postedBy.fullname}
                postedDate={date}
                content={item.content}
                renderTimeLine={renderTimeline}
                time={new Date(timeLine)}
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
              />
            );
        })}

        <div ref={myRef}></div>
      </div>
      <div className={style.messageSender}>
        <div className={style.messageInput}>
          <form className={style.messageField} onSubmit={handleSubmit(sendMessageHandler)}>
            <input
              autoComplete="off"
              className={style.messageTextField}
              type="text"
              placeholder="Type a message here"
              {...register('msgContent')}
            ></input>
            {!errors.msgContent && (
              <Button type="submit" className={style.messageSubmit} variant="contained" color="primary">
                <SendIcon />
              </Button>
            )}

            {errors.msgContent && (
              <Button className={style.messageSubmit} variant="contained" disabled>
                <SendIcon />
              </Button>
            )}
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ChatRoom;
