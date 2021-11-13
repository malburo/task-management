import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';
import GroupIcon from '@mui/icons-material/Group';
import { LoadingButton } from '@mui/lab';
import {
  Avatar,
  Box,
  Button,
  CardMedia,
  Chip,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import { socketClient } from 'api/socketClient';
import taskApi from 'api/taskApi';
import uploadApi from 'api/uploadApi';
import { RootState } from 'app/store';
import { ILabel } from 'models/label';
import { ITask } from 'models/task';
import { IUser } from 'models/user';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { labelsSelector, membersSelector, tasksSelector } from '../boardSlice';
import AddComment from '../components/comment/AddComment';
import CommentList from '../components/comment/CommentList';
import SearchPhoto from '../components/SearchPhoto';
import AssignDeadline from '../components/task/AssignDeadline';
import AssignLabel from '../components/task/AssignLabel';
import AssignTask from '../components/task/AssignTask';
import TaskDeadline from '../components/task/TaskDeadline';
import TaskDescription from '../components/task/TaskDescription';
import TaskTitle from '../components/task/TaskTitle';

interface Params {
  boardId: string;
  taskId: string;
}

export default function TaskDetail() {
  const { boardId, taskId } = useParams<Params>();
  const history = useHistory();
  const [open, setOpen] = useState(true);
  const [coverUrl, setCoverUrl] = useState<string>('https://www.viet247.net/images/noimage_food_viet247.jpg');
  const [coverObj, setCoverObj] = useState<any>(null);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [showSaveButton, setShowSaveButton] = useState<boolean>(false);

  const task: ITask = useSelector((state: RootState) => tasksSelector.selectById(state, taskId))!;
  const labels: ILabel[] = useSelector((state: RootState) =>
    labelsSelector.selectAll(state).filter((label: ILabel) => task.labelsId.includes(label._id))
  );
  const members: IUser[] = useSelector((state: RootState) =>
    membersSelector.selectAll(state).filter((member: IUser) => task.membersId.includes(member._id))
  );

  useEffect(() => {
    if (!task?.coverUrl) return;
    setCoverUrl(task?.coverUrl);
  }, [task?.coverUrl]);

  useEffect(() => {
    socketClient.emit('task:join', taskId);
    return () => {
      socketClient.emit('task:leave', taskId);
    };
  }, [taskId]);

  const handleClose = () => {
    setOpen(false);
    history.push(`/boards/${boardId}`);
  };

  const handleSelectPhoto = (coverUrl: string) => {
    setCoverUrl(coverUrl);
    setShowSaveButton(true);
  };
  const handleUploadPhoto = (coverObj: any) => {
    setCoverObj(coverObj);
    setShowSaveButton(true);
  };
  const handleClickSaveImage = async () => {
    try {
      setIsUpdating(true);
      if (coverUrl.includes('blob')) {
        let formData = new FormData();
        formData.append('image', coverObj);
        const { data } = await uploadApi.upload(formData);
        const payload = { boardId, taskId, data: { coverUrl: data.result.secure_url } };
        await taskApi.update(payload);
        setIsUpdating(false);
        setShowSaveButton(false);
        return;
      }
      const payload = { boardId, taskId, data: { coverUrl } };
      await taskApi.update(payload);
    } catch (error) {
      console.log(error);
    }
    setIsUpdating(false);
    setShowSaveButton(false);
  };
  const handleClickCancelSaveImage = () => {
    setCoverUrl(task?.coverUrl || 'https://www.viet247.net/images/noimage_food_viet247.jpg');
    setIsUpdating(false);
    setShowSaveButton(false);
  };

  if (!task) return <h1>empty</h1>;

  return (
    <Box>
      <Dialog onClose={handleClose} aria-labelledby="task-detail-dialog" open={open} fullWidth scroll="body">
        <Box padding="24px 24px 0px 24px">
          <Box position="relative">
            <CardMedia image={coverUrl} style={{ height: '180px', borderRadius: '8px' }} />
            {showSaveButton && (
              <Box position="absolute" right="12px" bottom="12px">
                <Button
                  variant="contained"
                  color="error"
                  sx={{ marginRight: '24px' }}
                  onClick={handleClickCancelSaveImage}
                >
                  Cancel
                </Button>
                <LoadingButton
                  type="submit"
                  loading={isUpdating}
                  variant="contained"
                  color="primary"
                  onClick={handleClickSaveImage}
                >
                  Save
                </LoadingButton>
              </Box>
            )}
          </Box>
          <Box paddingTop="8px" marginTop="12px">
            <Box>
              {labels.map((label) => (
                <Chip
                  label={label.name}
                  sx={{ bgcolor: `${label.color}26`, color: label.color, margin: '0px 4px 4px 0px', fontWeight: '700' }}
                  key={label._id}
                />
              ))}
            </Box>
            <Box marginTop="12px">{task.deadlineDay && <TaskDeadline value={task.deadlineDay} />}</Box>
          </Box>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 12,
              top: 12,
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent>
          <Grid container spacing={4} sx={{ minHeight: '500px' }}>
            <Grid item xs={9}>
              <TaskTitle value={task.title} />
              <TaskDescription value={task.description} />
              <AddComment />
              <CommentList taskId={taskId} />
            </Grid>
            <Grid item xs={3}>
              <Box display="flex" alignItems="center" color="#BDBDBD" marginBottom="12px" height="30px">
                <AccountCircleIcon sx={{ width: '20px', height: '20px', marginRight: '4px' }} />
                <Typography variant="regular2" sx={{ marginRight: '4px' }}>
                  Actions
                </Typography>
              </Box>
              <Box>
                <SearchPhoto onSelectPhoto={handleSelectPhoto} onUploadPhoto={handleUploadPhoto} />
                <AssignDeadline value={task.deadlineDay} />
                <AssignLabel task={task} />
                <AssignTask task={task} />
              </Box>
              <Box marginTop="16px">
                {members.length > 0 && (
                  <Box display="flex" alignItems="center" color="#BDBDBD" margin="12px 0px 12px 0px">
                    <GroupIcon sx={{ width: '20px', height: '20px', marginRight: '4px' }} />
                    <Typography variant="regular2" sx={{ marginRight: '4px' }}>
                      Members
                    </Typography>
                  </Box>
                )}
                {members.map((member) => (
                  <Box display="flex" alignItems="center" marginTop="16px" key={member._id}>
                    <Avatar sx={{ marginRight: '16px' }} src={member.profilePictureUrl} />
                    <Typography variant="bold2">{member.username}</Typography>
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
