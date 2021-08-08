import Typography from '@material-ui/core/Typography'
import React from "react";
import Button from '@material-ui/core/Button'
import ChatRoomStyle from './ChatRoomStyle';
import SendIcon from '@material-ui/icons/Send';
import Message from '../Message/Message';
import HorizontalRule from '../HorizontalRule/HorizontalRule';
import MyMessage from '../MyMessage/MyMessage';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AppBar } from '@material-ui/core';


let message = {
    name: 'Andrew',
    postedDate: new Date(),
    content: "Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur"
}

interface IParamChatRoom {
    id: string;
}

const ChatRoom: React.FC = () => {
    const { id } = useParams<IParamChatRoom>();
    const style = ChatRoomStyle();
    const myRef = React.useRef<HTMLDivElement>(null);
    useEffect(() => {
        myRef.current?.scrollIntoView();
    })
    return (
        <React.Fragment>
            <AppBar position="relative" className={style.roomHeader}>                                
                <Typography variant='subtitle1' className={style.roomTitle}>{id}</Typography>                                     
            </AppBar>
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
                        <input className={style.messageTextField} type='text' placeholder='Type a message here'></input>
                        <Button className={style.messageSubmit} variant="contained" color="primary">
                            <SendIcon></SendIcon>
                        </Button>
                    </div>   
                </div>
            </div>
        </React.Fragment>
    )
}

export default ChatRoom;