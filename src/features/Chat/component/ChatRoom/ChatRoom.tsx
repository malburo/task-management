import Typography from '@mui/material/Typography';
import React from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Message from '../Message/Message';
import HorizontalRule from '../HorizontalRule/HorizontalRule';
import MyMessage from '../MyMessage/MyMessage';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Hidden, IconButton } from '@mui/material';
import ListIcon from '@mui/icons-material/List';
import ChatRoomStyle from './ChatRoomStyle';

let message = {
  name: 'Andrew',
  postedDate: new Date(),
  content:
    'Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur',
};

interface IParamChatRoom {
  id: string;
}

interface IChatRoomProps {
  setMenuState: (active: boolean) => void;
  setAnyRoomState: (active: boolean) => void;
}

const ChatRoom: React.FC<IChatRoomProps> = ({ setMenuState, setAnyRoomState }) => {
  const { id } = useParams<IParamChatRoom>();
  const style = ChatRoomStyle();
  const myRef = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    setAnyRoomState(true);
    myRef.current?.scrollIntoView();
  });
  const clickHandler = () => {
    setMenuState(true);
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
          {id}
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
