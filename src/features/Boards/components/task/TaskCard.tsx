import { Avatar, AvatarGroup, Card, Chip, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { RootState } from 'app/store';
import { format } from 'date-fns';
import { ILabel } from 'models/label';
import { ITask } from 'models/task';
import { IUser } from 'models/user';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { labelsSelector, membersSelector } from '../../boardSlice';

const useStyles = makeStyles({
  cover: {
    width: '100%',
    height: 120,
    objectFit: 'cover',
    borderRadius: 'inherit',
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
    <Box>
      <Card sx={{ marginBottom: '12px', cursor: 'pointer' }} onClick={handleClickTask}>
        {task?.coverUrl?.length >= 0 && (
          <img src={task.coverUrl} alt="task cover" className={classes.cover} draggable="false" />
        )}
        <Box>
          <Typography variant="regular4">{task.title}</Typography>
        </Box>
        <Box marginTop="12px">
          {labels.map((label) => (
            <Chip
              label={label.name}
              sx={{
                bgcolor: `${label.color}26`,
                color: label.color,
                margin: '0px 8px 4px 0px',
                fontSize: '12px',
              }}
              key={label._id}
            />
          ))}
        </Box>
        <Box display="flex" alignItems="center" justifyContent="space-between" marginTop="12px">
          <AvatarGroup max={3}>
            {members.map((member) => (
              <Avatar variant="rounded" src={member.profilePictureUrl} key={member._id} />
            ))}
          </AvatarGroup>
          {task.deadlineDay && (
            <Box
              bgcolor={`${
                task.status === 'FINISHED'
                  ? '#5fb181'
                  : task.status === 'DEADLINE_EXPIRED'
                  ? '#EB5757'
                  : task.status === 'REMINDER'
                  ? '#f7b554'
                  : '#999999'
              }`}
              borderRadius="4px "
              padding="4px 8px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="regular1" sx={{ color: 'white' }}>
                {format(new Date(task.deadlineDay), 'dd-MM HH:mm')}
              </Typography>
            </Box>
          )}
        </Box>
      </Card>
    </Box>
  );
};

export default TaskCard;
