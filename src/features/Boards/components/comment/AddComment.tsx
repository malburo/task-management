import ChatIcon from '@mui/icons-material/Chat';
import { Avatar, Box, Button, Paper, Typography } from '@mui/material';
import commentApi from 'api/commentApi';
import { RootState } from 'app/store';
import EditorField from 'components/form-control/EditorField';
import { convertToRaw, EditorState } from 'draft-js';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

interface FormValues {
  content: EditorState;
}
interface Params {
  boardId: string;
  taskId: string;
}

const AddComment: React.FC = () => {
  const { boardId, taskId } = useParams<Params>();
  const { currentUser } = useSelector((state: RootState) => state.auth);
  const [mode, setMode] = useState<'PREVIEW' | 'EDIT'>('PREVIEW');

  const form = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      content: () => EditorState.createEmpty(),
    },
  });
  const onSubmit: SubmitHandler<FormValues> = async ({ content }: any) => {
    if (!content.getCurrentContent().hasText()) {
      setMode('PREVIEW');
      return;
    }
    const currentContent = content.getCurrentContent();
    const contentRaw = JSON.stringify(convertToRaw(currentContent));
    const payload = { boardId, taskId, content: contentRaw };
    await commentApi.create(payload);
    form.setValue('content', () => EditorState.createEmpty());
    form.reset();
    setMode('PREVIEW');
  };
  const onFocus = () => {
    setMode('EDIT');
  };
  const onClickCancel = () => {
    setMode('PREVIEW');
    form.reset();
  };
  return (
    <>
      <Box display="flex" alignItems="center" color="#BDBDBD" margin="12px 0px 12px 0px" height="30px">
        <ChatIcon sx={{ width: '20px', height: '20px', marginRight: '4px' }} />
        <Typography variant="regular2" sx={{ marginRight: '4px' }}>
          Comments
        </Typography>
      </Box>
      <Paper elevation={0}>
        <Box
          border={`${mode === 'PREVIEW' ? '1px solid transparent' : '1px solid #ddd'}`}
          padding="12px"
          borderRadius="4px"
          bgcolor="secondary.main"
          onFocus={onFocus}
        >
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Box>
              <Box display="flex">
                <Avatar variant="rounded" src={currentUser?.profilePictureUrl} sx={{ marginRight: '12px' }} />
                <Box width="100%" marginTop="4px">
                  <EditorField name="content" placeholder="Write a comment..." form={form} />
                </Box>
              </Box>
              {mode === 'EDIT' && (
                <Box textAlign="right" marginTop="12px">
                  <Button variant="contained" color="secondary" onClick={onClickCancel} style={{ marginRight: 12 }}>
                    cancel
                  </Button>
                  <Button type="submit" variant="contained" color="primary">
                    comment
                  </Button>
                </Box>
              )}
            </Box>
          </form>
        </Box>
      </Paper>
    </>
  );
};

export default AddComment;
