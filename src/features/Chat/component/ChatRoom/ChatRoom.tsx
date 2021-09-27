import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import Message from '../Message/Message';
import HorizontalRule from '../HorizontalRule/HorizontalRule';
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

let message = {
  name: 'Andrew',
  postedDate: new Date(),
  content:
    'Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur',
};

interface IParamChatRoom {
  id: string;
}

const ChatRoom: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [room, setRoom] = useState<IRoom>();
  const { id } = useParams<IParamChatRoom>();
  const style = ChatRoomStyle();
  const myRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(setAnyRoom(true));
    dispatch(setMenuOpen(false));
  }, []);

  useEffect(() => {
    roomApi.getOne(id.toString()).then((res) => setRoom(res.data.room));
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
        <Message name={message.name} postedDate={message.postedDate.toDateString()} content={message.content}></Message>
        <Message name={message.name} postedDate={message.postedDate.toDateString()} content={message.content}></Message>
        <MyMessage postedDate={message.postedDate.toDateString()} content={message.content}></MyMessage>
        <HorizontalRule time="20/2/2021"></HorizontalRule>
        <Message name={message.name} postedDate={message.postedDate.toDateString()} content={message.content}></Message>
        <MyMessage postedDate={message.postedDate.toDateString()} content={message.content}></MyMessage>
        <MyMessage postedDate={message.postedDate.toDateString()} content={message.content}></MyMessage>
        <Message name={message.name} postedDate={message.postedDate.toDateString()} content={message.content}></Message>
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
