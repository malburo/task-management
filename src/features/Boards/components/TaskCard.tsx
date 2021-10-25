import { Avatar, AvatarGroup, Box, Card, Chip, Typography } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import { makeStyles } from '@mui/styles';
import { ITask } from 'models/task';
import { useHistory } from 'react-router';

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
  const history = useHistory();
  const handleClickTask = () => {
    history.push('/boards/616bc72720845003622501e9/zxc');
  };
  return (
    <Card sx={{ border: '2px solid #0000000a', marginBottom: '24px' }} onClick={handleClickTask}>
      <img
        src="https://scontent.fsgn3-1.fna.fbcdn.net/v/t1.6435-9/245640291_2726439204317433_3912247688081488990_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=FMnKEZNfGtUAX8D6abN&_nc_ht=scontent.fsgn3-1.fna&oh=52298cd7782ab16c1c883b825243130d&oe=6195EEFF"
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
