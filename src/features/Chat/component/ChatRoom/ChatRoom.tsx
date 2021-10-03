import React, { useState } from 'react';
import Message from '../Message/Message';
import MyMessage from '../MyMessage/MyMessage';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ChatRoomStyle from './ChatRoomStyle';
import { useDispatch, useSelector } from 'react-redux';
import { setAnyRoom, setMenuOpen } from 'features/Chat/ReduxSlice/SidebarAppChatSlice';
import { AppDispatch, RootState } from 'app/store';
import { IMessage } from 'models/messages';
import messageApi from 'api/messageApi';
import { Button, Hidden, IconButton, Typography } from '@mui/material';
import ListIcon from '@mui/icons-material/List';
import SendIcon from '@mui/icons-material/Send';
import { getOneRoom } from 'features/Chat/ReduxSlice/RoomSlice';

export interface IParamChatRoom {
  id: string;
}

interface IListMessage {
  lstMsg: Array<IMessage>;
}

const ChatRoom: React.FC = () => {
  let timeLine = 0;
  const dispatch = useDispatch<AppDispatch>();
  const [messages, setMessages] = useState<IListMessage>({ lstMsg: [] });
  const { id } = useParams<IParamChatRoom>();
  const style = ChatRoomStyle();
  const myRef = React.useRef<HTMLDivElement>(null);
  const room = useSelector((state: RootState) => state.room);

  useEffect(() => {
    dispatch(setAnyRoom(true));
    dispatch(setMenuOpen(false));
  }, []);

  useEffect(() => {
    dispatch(getOneRoom({ id }));
    myRef.current?.scrollIntoView();
  }, [dispatch, id]);

  useEffect(() => {
    messageApi.getAllInRoom(room._id).then((res) => {
      setMessages({ lstMsg: res.data.rs });
    });
  }, [room]);

  const clickHandler = () => {
    dispatch(setMenuOpen(true));
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
      <div className={style.chatRoom}>
        {messages.lstMsg.map((item) => {
          let date = new Date(item.createdAt);
          let renderTimeline = false;
          if (timeLine + 1000 * 3600 * 24 * 7 < date.getTime()) {
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
          <div className={style.messageField}>
            <input className={style.messageTextField} type="text" placeholder="Type a message here"></input>
            <Button className={style.messageSubmit} variant="contained" color="primary">
              <SendIcon />
            </Button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ChatRoom;
