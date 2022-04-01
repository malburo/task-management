import SendIcon from '@mui/icons-material/Send';
import { Box, IconButton, Paper } from '@mui/material';
import messageApi from 'api/messageApi';
import InputBaseField from 'components/form-control/InputBaseField';
import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import EmojiPicker from './EmojiPicker';
import GifPicker from './GiphyPicker';
import UploadImage from './UploadImage';

interface Params {
  boardId: string;
  roomId: string;
}
const MessageForm = () => {
  const { boardId, roomId } = useParams<Params>();

  const form = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      content: '',
    },
  });

  const onSubmit: any = async ({ content }: any) => {
    try {
      if (!roomId) return;
      const payload = { roomId, content, type: 'TEXT' };
      console.log({ payload });
      await messageApi.create(payload);
      form.reset({ content: '' });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box display="flex" borderTop="1px solid #ccc" alignItems="center" p={4}>
      <Box mr={2}>
        <UploadImage />
      </Box>
      <Box mr={2}>
        <GifPicker />
      </Box>
      <Box mr={2}>
        <EmojiPicker setValue={form.setValue} getValues={form.getValues} />
      </Box>
      <Paper elevation={0} sx={{ flex: 1, marginX: 4 }}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Box width="100%" marginTop="4px">
            <InputBaseField
              form={form}
              name="content"
              placeholder="Type a message here"
              sx={{ fontSize: '14px', padding: '4px 12px', borderRadius: '8px' }}
              endAdornment={
                <IconButton color="primary" type="submit">
                  <SendIcon sx={{ fontSize: '16px' }} />
                </IconButton>
              }
            />
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default MessageForm;
