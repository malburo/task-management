import { Button, Fab, IconButton, Box } from '@mui/material';
import * as yup from 'yup';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import SendIcon from '@mui/icons-material/Send';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import messageApi from 'api/messageApi';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'app/store';
import { createOne } from 'features/Chat/ReduxSlice/MessagesSlice';
import CreateFormMessage from '../FormDialog/CreateFormMessage';
import { useState } from 'react';
import useSendMessageFormStyles from './style';
import theme from 'theme';

const scheme = yup
  .object()
  .shape({
    msgContent: yup.string().required('Please enter message').min(1).max(200, 'Please enter up to 100 characters'),
  })
  .required();
interface IInputMessage {
  msgContent: string;
}

export default function SendMessageForm() {
  const room = useSelector((state: RootState) => state.room.roomInfor);
  const dispatch = useDispatch<AppDispatch>();
  const [isCreateFormMessage, setIsCreateFormMessage] = useState<boolean>(false);

  const style = useSendMessageFormStyles(theme);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IInputMessage>({
    mode: 'onSubmit',
    defaultValues: {
      msgContent: '',
    },
    resolver: yupResolver(scheme),
  });

  const submitImage = async (event: React.FormEvent<HTMLInputElement>) => {
    const toastId = toast.loading('Loading...');
    try {
      if (event.currentTarget.files) {
        const file = event.currentTarget.files[0];
        if (file && file.type.match(/(png|jpg|jpeg)/)) {
          await messageApi.createImageMessage({ roomId: room._id, file: file });
          // myRef.current?.scroll({ top: myRef.current.scrollHeight });
          toast.success('Success', { id: toastId });
        } else toast.error('Please choose image file', { id: toastId });
      }
    } catch (err) {
      toast.error(err.message || 'Internal Server Error', { id: toastId });
    }
  };

  const sendMessageHandler = async (data: IInputMessage) => {
    await dispatch(createOne({ _id: room._id, content: data.msgContent }));
    reset();
  };
  return (
    <Box className={style.formField}>
      {isCreateFormMessage && <CreateFormMessage isOpen={isCreateFormMessage} setClose={setIsCreateFormMessage} />}
      <Box className={style.messageInput}>
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
          <IconButton onClick={() => setIsCreateFormMessage(true)} className={style.imageButton}>
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
      </Box>
    </Box>
  );
}
