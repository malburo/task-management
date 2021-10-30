import { Card, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ITask } from 'models/task';
import { useHistory, useParams } from 'react-router';

const useStyles = makeStyles({
  cover: {
    width: '100%',
    height: 120,
    objectFit: 'cover',
    borderRadius: 'inherit',
  },
  title: {
    margin: '12px 0px',
  },
  label: {
    marginRight: '12px',
    marginBottom: '12px',
  },
});

interface TaskCardProps {
  task: ITask;
}
interface Params {
  boardId: string;
}
const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { boardId } = useParams<Params>();
  const classes = useStyles();
  const history = useHistory();

  const handleClickTask = () => {
    history.push(`/boards/${boardId}/tasks/${task._id}`);
  };
  return (
    <div>
      <Card sx={{ border: '2px solid #0000000a', marginBottom: '12px' }} onClick={handleClickTask}>
        {task?.coverUrl?.length >= 0 && (
          <img src={task.coverUrl} alt="task cover" className={classes.cover} draggable="false" />
        )}

        <Typography variant="regular4">{task.title}</Typography>
        {/* <Box>
        <Chip label="javascript" className={classes.label} />
        <Chip label="java" className={classes.label} />
        <Chip label="java" className={classes.label} />
      </Box> */}
        {/* <Box display="flex" alignItems="center" justifyContent="space-between">
        <AvatarGroup max={3}>
          <Avatar variant="rounded" src="https://avatars3.githubusercontent.com/u/22362391?v=4" />
          <Avatar variant="rounded" src="https://avatars3.githubusercontent.com/u/22362391?v=4" />
          <Avatar variant="rounded" src="https://avatars3.githubusercontent.com/u/22362391?v=4" />
          <Avatar variant="rounded" src="https://avatars3.githubusercontent.com/u/22362391?v=4" />
        </AvatarGroup>
        <Box display="flex" alignItems="center">
          <CommentIcon style={{ width: 14, height: 14, color: '#BDBDB' }} />
          <Typography variant="regular1">6</Typography>
        </Box>
      </Box> */}
      </Card>
    </div>
  );
};

export default TaskCard;
