import { Avatar, AvatarGroup, Card, Chip, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { RootState } from 'app/store';
import { ILabel } from 'models/label';
import { ITask } from 'models/task';
import { IUser } from 'models/user';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { labelsSelector, membersSelector } from '../boardSlice';

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

  const labels: ILabel[] = useSelector((state: RootState) => {
    return labelsSelector.selectAll(state).filter((label: ILabel) => task.labelsId.includes(label._id));
  });
  const members: IUser[] = useSelector((state: RootState) => {
    return membersSelector.selectAll(state).filter((member: IUser) => task.membersId.includes(member._id));
  });
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
        <Box>
          {labels.map((label) => (
            <Chip
              label={label.name}
              sx={{ bgcolor: label.color, color: 'white', margin: '4px 0px 8px 0px' }}
              key={label._id}
            />
          ))}
        </Box>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <AvatarGroup max={3}>
            {members.map((member) => (
              <Avatar variant="rounded" src={member.profilePictureUrl} />
            ))}
          </AvatarGroup>
          {/* <Box display="flex" alignItems="center">
          <CommentIcon style={{ width: 14, height: 14, color: '#BDBDB' }} />
          <Typography variant="regular1">6</Typography>
        </Box> */}
        </Box>
      </Card>
    </div>
  );
};

export default TaskCard;
