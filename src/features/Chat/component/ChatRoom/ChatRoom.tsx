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
import { Button, Fab, Hidden, IconButton, Typography } from '@mui/material';
import ListIcon from '@mui/icons-material/List';
import SendIcon from '@mui/icons-material/Send';
import { getOneRoom } from 'features/Chat/ReduxSlice/RoomSlice';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createOne, getMessageInRoom, messagesSeletor } from 'features/Chat/ReduxSlice/MessagesSlice';
import useChat from 'hooks/useChat';
import { DateCount } from 'utilities/dateUtil';
import { IUser } from 'models/user';
import Loader from '../Loader/Loader';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import messageApi from 'api/messageApi';
import { debounce } from 'lodash';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import CreateFormMessage from '../FormDialog/CreateFormMessage';

import toast from 'react-hot-toast';

export interface IParamChatRoom {
  id: string;
}

const scheme = yup
  .object()
  .shape({
    msgContent: yup.string().required('Please enter message').max(200, 'Please enter up to 100 characters'),
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
  const me = useSelector((state: RootState) => state.auth.currentUser) as IUser;
  const messages = useSelector(messagesSeletor.selectAll);
  // eslint-disable-next-line
  const [seed, setSeed] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isCreateFormMessage, setIsCreateFormMessage] = useState<boolean>(false);
  // eslint-disable-next-line
  const chat = useChat();

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
    setIsLoading(true);
    dispatch(getOneRoom({ id })).then(() => setIsLoading(false));
    setSeed(0);
  }, [dispatch, id]);

  useEffect(() => {
    (async () => {
      if (room._id === '') return;
      await dispatch(getMessageInRoom({ id: room._id, seed: seed }));
      myRef.current?.scroll({ top: myRef.current.scrollHeight });
    })();
    // eslint-disable-next-line
  }, [room]);

  const clickHandler = () => {
    dispatch(setMenuOpen(true));
  };

  const sendMessageHandler = (data: IInputMessage) => {
    (async () => {
      await dispatch(createOne({ roomId: room._id, content: data.msgContent }));
      reset();
      myRef.current?.scroll({ top: myRef.current.scrollHeight });
    })();
  };

  const submitImage = async (event: React.FormEvent<HTMLInputElement>) => {
    const toastId = toast.loading('Loading...');
    try {
      if (event.currentTarget.files) {
        const file = event.currentTarget.files[0];
        if (file && file.type.match(/(png|jpg|jpeg)/)) {
          await messageApi.createImageMessage({ roomId: room._id, file: file });
          myRef.current?.scroll({ top: myRef.current.scrollHeight });
          toast.success('Success', { id: toastId });
        } else toast.error('Please choose image file', { id: toastId });
      }
    } catch (err) {
      toast.error(err.message || 'Internal Server Error', { id: toastId });
    }
  };

  const fetchMoreMsg = (scrollPosition: Number) => {
    (async () => {
      if (scrollPosition !== 0) return;
      if (room._id === '') return;
      setIsLoading(true);
      const positionScroll = myRef.current?.scrollHeight || 0;
      await dispatch(getMessageInRoom({ id: room._id, seed: seed + 1 }));
      setIsLoading(false);
      await myRef.current?.scroll({ top: myRef.current?.scrollHeight - positionScroll });
      setSeed(seed + 1);
    })();
  };

  const debounceCall = debounce((scrollPosition) => fetchMoreMsg(scrollPosition), 500);

  const scrollDetect = (event: React.UIEvent<HTMLDivElement>) => {
    debounceCall(event.currentTarget.scrollTop);
  };

  return (
    <React.Fragment>
      {isCreateFormMessage && (
        <CreateFormMessage isOpen={isCreateFormMessage} setClose={setIsCreateFormMessage}></CreateFormMessage>
      )}
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
      {isLoading && <Loader />}
      <div className={style.chatRoom} ref={myRef} onScroll={scrollDetect}>
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
                profilePictureUrl={item.postedBy.profilePictureUrl}
                name={item.postedBy.fullname}
                postedDate={date}
                content={item.content}
                renderTimeLine={renderTimeline}
                time={new Date(timeLine)}
                type={item.type ? item.type : 1}
                form={item.form}
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
                form={item.form}
                type={item.type ? item.type : 1}
              />
            );
        })}
      </div>
      <div className={style.messageSender}>
        <div className={style.messageInput}>
          <form className={style.messageField} onSubmit={handleSubmit(sendMessageHandler)}>
            <input
              accept="image/png, image/gif, image/jpeg"
              className={style.imageInput}
              id="contained-button-file"
              onChange={submitImage}
              multiple
              type="file"
            />
            <label htmlFor="contained-button-file">
              <Fab component="span" className={style.imageButton}>
                <AddPhotoAlternateIcon />
              </Fab>
            </label>
            <IconButton
              onClick={() => setIsCreateFormMessage(true)}
              className={style.imageButton}
              sx={{ width: '56px', marginLeft: '10px !important' }}
            >
              <FormatListBulletedIcon />
            </IconButton>
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
