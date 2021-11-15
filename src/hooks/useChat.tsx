import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'app/store';
import { addNewMessage, editOneMessage, removeOneMessage } from 'features/Chat/ReduxSlice/MessagesSlice';
import { IUser } from 'models/user';
import { useEffect } from 'react';
import { IMessage } from 'models/messages';
import { socketClient } from 'api/socketClient';

const useChat = () => {
  const dispatch = useDispatch<AppDispatch>();
  const room = useSelector((state: RootState) => state.room.roomInfor);
  const me = useSelector((state: RootState) => state.auth.currentUser) as IUser;

  useEffect(() => {
    joinRoom(room._id);
    return () => {
      leaveRoom(room._id);
    };
    // eslint-disable-next-line
  }, [room]);

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
    joinRoom,
    leaveRoom,
  };
};

export default useChat;
