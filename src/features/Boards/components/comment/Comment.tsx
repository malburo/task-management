import { Avatar, Box, Button, Typography, Paper } from '@mui/material';
import commentApi from 'api/commentApi';
import { RootState } from 'app/store';
import EditorField from 'components/form-control/EditorField';
import { formatDistanceToNow } from 'date-fns';
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import { IConmment } from 'models/comment';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import DeleteComment from './DeleteComment';

interface FormValues {
  content: EditorState;
}
interface Params {
  boardId: string;
  taskId: string;
}
interface Props {
  comment: IConmment;
}

const Comment: React.FC<Props> = ({ comment }) => {
  const { taskId } = useParams<Params>();
  const [mode, setMode] = useState<'PREVIEW' | 'EDIT'>('PREVIEW');
  const { currentUser } = useSelector((state: RootState) => state.auth);

  const form = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      content: () =>
        comment.content
          ? EditorState.createWithContent(convertFromRaw(JSON.parse(comment.content)))
          : EditorState.createEmpty(),
    },
  });
  const handleClickEdit = () => {
    setMode('EDIT');
  };
  const handleClickCancel = () => {
    setMode('PREVIEW');
  };
  const onSubmitUpdate: SubmitHandler<FormValues> = async ({ content }: any) => {
    if (!content.getCurrentContent().hasText()) {
      setMode('PREVIEW');
      return;
    }
    const currentContent = content.getCurrentContent();
    const contentRaw = JSON.stringify(convertToRaw(currentContent));
    if (contentRaw === comment.content) {
      setMode('PREVIEW');
      return;
    }
    const payload = { commentId: comment._id, data: { taskId, content: contentRaw } };
    await commentApi.update(payload);
    form.reset();
  };
  const onConfirmDelete = async () => {
    try {
      const payload = { commentId: comment._id, data: { taskId } };
      await commentApi.deleteOne(payload);
    } catch (error) {}
  };
  return (
    <Paper elevation={0}>
      <Box
        marginBottom="12px"
        key={comment._id}
        borderRadius="8px"
        padding="12px"
        marginY="12px"
        bgcolor="secondary.main"
      >
        <Box display="flex" justifyContent="space-between" marginBottom="12px" alignItems="flex-start">
          <Box display="flex" alignItems="center">
            <Avatar variant="rounded" sx={{ marginRight: '12px' }} src={comment.member.profilePictureUrl} />
            <Box>
              <Typography variant="regular3" display="block">
                {comment.member.username}
              </Typography>
              <Typography variant="regular2">
                {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
              </Typography>
            </Box>
          </Box>
          {currentUser?._id === comment.member._id && (
            <Box display="flex" alignItems="center">
              <Box>
                <Typography
                  variant="regular2"
                  onClick={handleClickEdit}
                  sx={{ marginRight: '4px', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                >
                  Edit
                </Typography>
              </Box>
              <DeleteComment onSubmit={onConfirmDelete} />
            </Box>
          )}
        </Box>
        <Box>
          <form onSubmit={form.handleSubmit(onSubmitUpdate)}>
            <Box>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <EditorField name="content" placeholder="Comment..." form={form} readOnly={mode === 'PREVIEW'} />
              </Box>
              {mode === 'EDIT' && (
                <Box textAlign="right" marginTop="12px">
                  <Button variant="contained" color="secondary" style={{ marginRight: 12 }} onClick={handleClickCancel}>
                    cancel
                  </Button>
                  <Button type="submit" variant="contained" color="primary">
                    save
                  </Button>
                </Box>
              )}
            </Box>
          </form>
        </Box>
      </Box>
    </Paper>
  );
};

export default Comment;
