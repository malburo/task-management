import { Button, Box } from '@mui/material';
import * as yup from 'yup';
import SendIcon from '@mui/icons-material/Send';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'app/store';
import { createBotRequest } from 'features/Chat/ReduxSlice/MessagesSlice';
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

export default function BotSendMessageForm() {
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

  const sendMessageHandler = async (data: IInputMessage) => {
    await dispatch(createBotRequest({ _id: room._id, content: data.msgContent }));
    reset();
  };
  return (
    <Box className={style.formField}>
      {isCreateFormMessage && <CreateFormMessage isOpen={isCreateFormMessage} setClose={setIsCreateFormMessage} />}
      <Box className={style.messageInput}>
        <form className={style.messageField} onSubmit={handleSubmit(sendMessageHandler)}>
          <input
            autoComplete="off"
            className={style.messageTextField}
            type="text"
            placeholder="Type a request for bot here"
            {...register('msgContent')}
          />
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
