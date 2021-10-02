import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import Message from '../Message/Message';
import HorizontalRule from '../HorizontalRule/TimeLine';
import MyMessage from '../MyMessage/MyMessage';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Hidden, IconButton } from '@material-ui/core';
import ListIcon from '@material-ui/icons/List';
import ChatRoomStyle from './ChatRoomStyle';
import { IRoom } from 'models/room';
import roomApi from 'api/roomApi';
import { useDispatch } from 'react-redux';
import { setAnyRoom, setMenuOpen } from 'features/Chat/ReduxSlice/SidebarAppChatSlice';
import { AppDispatch } from 'app/store';
import { IMessage } from 'models/messages';
import messageApi from 'api/messageApi';

interface IParamChatRoom {
  id: string;
}

interface IListMessage {
  lstMsg: Array<IMessage>;
}

const ChatRoom: React.FC = () => {
  let timeLine = 0;
  const dispatch = useDispatch<AppDispatch>();
  const [room, setRoom] = useState<IRoom>();
  const [messages, setMessages] = useState<IListMessage>({ lstMsg: [] });
  const { id } = useParams<IParamChatRoom>();
  const style = ChatRoomStyle();
  const myRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(setAnyRoom(true));
    dispatch(setMenuOpen(false));
  }, []);

  useEffect(() => {
    roomApi.getOne(id).then((res) => setRoom(res.data.room));
    messageApi.getAllInRoom(id).then((res) => {
      setMessages({ lstMsg: res.data.rs });
    });
    myRef.current?.scrollIntoView();
  }, [id]);

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
