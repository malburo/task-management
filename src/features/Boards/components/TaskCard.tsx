import { Avatar, AvatarGroup, Box, Card, Chip, Typography } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import { makeStyles } from '@mui/styles';
import { ITask } from 'models/task';

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

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const classes = useStyles();
  return (
    <Card sx={{ border: '2px solid #0000000a', marginBottom: '24px' }}>
      <img
        src="https://mir-s3-cdn-cf.behance.net/project_modules/1400/623df143063739.57e2065f398da.jpg"
        alt="asd"
        className={classes.cover}
      />
      <Typography variant="regular4">{task.title}</Typography>
      <Box>
        <Chip label="javascript" className={classes.label} />
        <Chip label="java" className={classes.label} />
        <Chip label="java" className={classes.label} />
      </Box>
      <Box display="flex" alignItems="center" justifyContent="space-between">
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
      </Box>
    </Card>
  );
};

export default TaskCard;
