import { Box } from '@mui/material';
import commentApi from 'api/commentApi';
import { socketClient } from 'api/socketClient';
import { IConmment } from 'models/comment';
import React, { useEffect, useState } from 'react';
import Comment from './Comment';

interface Props {
  taskId: string;
}

const CommentList: React.FC<Props> = ({ taskId }) => {
  const [comments, setComments] = useState<IConmment[]>([]);

  useEffect(() => {
    const fetchCommentsData = async () => {
      try {
        const { data } = await commentApi.getByTaskId({ taskId });
        setComments(data.comments as IConmment[]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCommentsData();
  }, [taskId]);

  useEffect(() => {
    (async () => {
      socketClient.on('comment:create', (newComment: IConmment) => {
        setComments([newComment, ...comments]);
      });
      socketClient.on('comment:update', (updatedComment: IConmment) => {
        const commentsClone = [...comments];
        const index = commentsClone.findIndex((comment) => comment._id === updatedComment._id);
        commentsClone[index] = updatedComment;
        setComments(commentsClone);
      });
      socketClient.on('comment:delete', (deletedComment: IConmment) => {
        const commentsClone = [...comments].filter((comment) => comment._id !== deletedComment._id);
        setComments(commentsClone);
      });
    })();
  }, [comments]);

  return (
    <Box>
      {comments.map((comment) => (
        <Comment comment={comment} key={comment._id} />
      ))}
    </Box>
  );
};

export default CommentList;
