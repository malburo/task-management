import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'app/store';
import {
  addNewMessage,
  editOneMessage,
  removeOneMessage,
  throwErr,
  throwNotification,
} from 'features/Chat/ReduxSlice/MessagesSlice';
import { IUser } from 'models/user';
import { useEffect, useRef } from 'react';
import { IMessage } from 'models/messages';
import { socketClient } from 'api/socketClient';

const useChat = () => {
  const dispatch = useDispatch<AppDispatch>();
  const room = useSelector((state: RootState) => state.room.roomInfor);
  const me = useSelector((state: RootState) => state.auth.currentUser) as IUser;
  const ref = useRef<string>();
  let prevRoom = ref.current;

  useEffect(() => {
    ref.current = room._id;
    leaveRoom(prevRoom);
    joinRoom(room._id);
    // eslint-disable-next-line
  }, [room]);

  const joinRoom = (data: string) => {
    socketClient.emit('chat:joinRoom', { roomId: data });
  };
  const leaveRoom = (data: string | undefined) => {
    if (data === undefined) return;
    socketClient.emit('chat:leaveRoom', { roomId: data });
  };

  const recieveMessage = () => {
    if (me._id === undefined) return;
    socketClient.on('chat:messageCommit', (data) => {
      let isMe = false;
      if (data.postedBy._id === me._id) isMe = true;
      dispatch(
        addNewMessage({
          _id: data._id,
          content: data.content,
          createdAt: data.createdAt,
          isMe: isMe,
          postedBy: data.postedBy,
        })
      );
    });
  };

  const sendDeleteMessage = (id: string) => {
    socketClient.emit('chat:deleteMessage', { messageId: id, from: me._id, to: room._id });
  };

  const sendEditMessage = (id: string, content: string) => {
    socketClient.emit('chat:editMessage', { messageId: id, newContent: content, from: me._id, to: room._id });
  };
  const recieveDeleteMessage = () => {
    if (me._id === undefined) return;
    socketClient.on('chat:deleteResult', (data) => {
      if (data.status === -1) return;
      dispatch(removeOneMessage(data.message._id));
    });
    socketClient.on('chat:ownerDeleteResult', (data) => {
      if (data.status === -1) dispatch(throwErr('Failed to delete this message'));
      if (data.status === 1) dispatch(throwNotification('Success'));
    });
  };
  const recieveEditMessage = () => {
    if (me._id === undefined) return;
    socketClient.on('chat:editResult', (data) => {
      if (data.status === -1) return;
      let payload = data.message as IMessage;
      let isMe = false;
      if (payload.postedBy._id === me._id) {
        isMe = true;
      }
      dispatch(
        editOneMessage({
          _id: payload._id,
          content: payload.content,
          createdAt: payload.createdAt,
          isMe: isMe,
          postedBy: payload.postedBy,
        })
      );
    });
    socketClient.on('chat:ownerEditResult', (data) => {
      if (data.status === -1) dispatch(throwErr('Failed to delete this message'));
      if (data.status === 1) dispatch(throwNotification('Success'));
    });
  };
  const sendMessage = (data: string) => {
    socketClient.emit('chat:newMessage', { message: data, from: me._id, to: room._id });
  };

  const typingSend = () => {
    socketClient.emit('chat:typing', { to: room._id, name: me.fullname });
  };

  const stopTypingSend = () => {
    socketClient.emit('chat:stopTyping', { to: room._id, name: me.fullname });
  };

  useEffect(() => {
    recieveMessage();
    recieveEditMessage();
    recieveDeleteMessage();
    // eslint-disable-next-line
  }, [socketClient]);

  return {
    sendMessage,
    sendDeleteMessage,
    sendEditMessage,
    recieveMessage,
    recieveDeleteMessage,
    recieveEditMessage,
    typingSend,
    stopTypingSend,
  };
};

export default useChat;
