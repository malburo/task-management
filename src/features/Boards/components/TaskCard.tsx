import { Avatar, AvatarGroup, Box, Chip, Typography } from '@material-ui/core';
import CommentIcon from '@material-ui/icons/Comment';
import { makeStyles } from '@material-ui/styles';
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
    <Box width="260px" bgcolor="#e4e4e4" margin="12px" padding="12px">
      <Box>
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
      </Box>
    </Box>
  );
};

export default TaskCard;
