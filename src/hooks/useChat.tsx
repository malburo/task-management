import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'app/store';
import { addNewMessage, editOneMessage, removeOneMessage } from 'features/Chat/ReduxSlice/MessagesSlice';
import { IUser } from 'models/user';
import { useEffect, useRef } from 'react';
import { IMessage } from 'models/messages';
import { socketClient } from 'api/socketClient';
import messageApi from 'api/messageApi';

const useChat = () => {
  const dispatch = useDispatch<AppDispatch>();
  const room = useSelector((state: RootState) => state.room.roomInfor);
  const me = useSelector((state: RootState) => state.auth.currentUser) as IUser;
  const ref = useRef<string>();
  let prevRoom = ref.current;

  useEffect(() => {
    ref.current = room._id;
    if (room._id === '') return;
    leaveRoom(prevRoom);
    joinRoom(room._id);
    messageApi.read({ roomId: room._id });
    // eslint-disable-next-line
  }, [room]);

  const joinChannel = (data: string) => {
    socketClient.emit('channel:join', { boardId: data });
  };

  const leaveChannel = (data: string | undefined) => {
    socketClient.emit('channel:leave', { boardId: data });
  };

  const joinRoom = (data: string) => {
    socketClient.emit('chat:join', { roomId: data });
  };
  const leaveRoom = (data: string | undefined) => {
    if (data === undefined) return;
    socketClient.emit('chat:leave', { roomId: data });
  };

  const recieveMessage = () => {
    if (me?._id === undefined) return;
    socketClient.on('chat:add-message', (data) => {
      let message = data.message as IMessage;
      dispatch(
        addNewMessage({
          _id: message._id,
          content: message.content,
          createdAt: message.createdAt,
          postedBy: message.postedBy,
          type: message.type != null ? message.type : 1,
          form: message.form,
        })
      );
    });
  };

  const recieveDeleteMessage = () => {
    if (me?._id === undefined) return;
    socketClient.on('chat:delete-message', (data) => {
      let message = data.message as IMessage;
      if (message.postedBy._id === me._id) return;
      dispatch(removeOneMessage(data.message._id));
    });
  };

  const recieveEditMessage = () => {
    if (me?._id === undefined) return;
    socketClient.on('chat:edit-message', (data) => {
      let message = data.message as IMessage;
      //if (message.postedBy._id === me._id) return;
      dispatch(
        editOneMessage({
          _id: message._id,
          content: message.content,
          createdAt: message.createdAt,
          postedBy: message.postedBy,
          type: message.type != null ? message.type : 1,
          form: message.form,
        })
      );
    });
  };

  useEffect(() => {
    recieveMessage();
    recieveEditMessage();
    recieveDeleteMessage();
    // eslint-disable-next-line
  }, [socketClient, me]);

  return {
    recieveMessage,
    recieveDeleteMessage,
    recieveEditMessage,
    joinChannel,
    joinRoom,
    leaveChannel,
    leaveRoom,
  };
};

export default useChat;