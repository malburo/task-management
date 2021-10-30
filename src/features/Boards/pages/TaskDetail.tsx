import CloseIcon from '@mui/icons-material/Close';
import DescriptionIcon from '@mui/icons-material/Description';
import { LoadingButton } from '@mui/lab';
import { Avatar, Box, Button, CardMedia, Dialog, DialogContent, Grid, IconButton, Typography } from '@mui/material';
import taskApi from 'api/taskApi';
import uploadApi from 'api/uploadApi';
import { RootState } from 'app/store';
import { ITask } from 'models/task';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { tasksSelector } from '../boardSlice';
import DescriptionEditor from '../components/editor/DescriptionEditor';
import AddLabel from '../components/form/AddLabel';
import AssignTask from '../components/form/AssignTask';
import EditTaskTitle from '../components/form/EditTaskTitle';
import SearchPhoto from '../components/form/SearchPhoto';

interface Params {
  boardId: string;
  taskId: string;
}

export default function TaskDetail() {
  const { boardId, taskId } = useParams<Params>();
  const history = useHistory();
  const task: ITask = useSelector((state: RootState) => tasksSelector.selectById(state, taskId))!;

  const [open, setOpen] = useState(true);
  const [coverUrl, setCoverUrl] = useState<string>(task?.coverUrl);
  const [coverObj, setCoverObj] = useState<any>(null);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [showSaveButton, setShowSaveButton] = useState<boolean>(false);

  useEffect(() => {
    setCoverUrl(task?.coverUrl);
  }, [task?.coverUrl]);

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
    setCoverUrl(task?.coverUrl);
    setIsUpdating(false);
    setShowSaveButton(false);
  };

  if (!task) return <h1>empty</h1>;

  return (
    <Box>
      <Dialog onClose={handleClose} aria-labelledby="task-detail-dialog" open={open} fullWidth>
        <Box padding="24px 24px 0px 24px">
          <Box position="relative">
            {coverUrl !== null ? (
              <CardMedia image={coverUrl} style={{ height: '180px', borderRadius: '8px' }} />
            ) : (
              <CardMedia
                image="https://www.viet247.net/images/noimage_food_viet247.jpg"
                style={{ height: '180px', borderRadius: '8px' }}
              />
            )}

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
              <Box>
                <EditTaskTitle value={task.title} />
                {/* <Typography variant="bold1">In list inprogress</Typography> */}
              </Box>
              <Box>
                <Box display="flex" alignItems="center" color="#BDBDBD" margin="24px 0px 12px 0px">
                  <DescriptionIcon sx={{ width: '20px', height: '20px', marginRight: '4px' }} />
                  <Typography variant="regular2" sx={{ marginRight: '4px' }}>
                    Description
                  </Typography>
                  {/* <Button
                    onClick={handleClickEditDescription}
                    variant="outlined"
                    startIcon={<CreateIcon />}
                    size="small"
                  >
                    Edit
                  </Button> */}
                </Box>
              </Box>
              <DescriptionEditor content={task.description} />
            </Grid>
            <Grid item xs={3}>
              <Box>
                <SearchPhoto onSelectPhoto={handleSelectPhoto} onUploadPhoto={handleUploadPhoto} />
                {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Stack spacing={3}>
                    <DateTimePicker
                      renderInput={(params) => <TextField {...params} placeholder="deadline date" />}
                      value={value}
                      onChange={(newValue) => {
                        setValue(newValue);
                      }}
                    />
                  </Stack>
                </LocalizationProvider> */}
                <AddLabel />
                <AssignTask />
              </Box>
              <Box marginTop="16px">
                <Box display="flex" alignItems="center" marginTop="16px">
                  <Avatar sx={{ marginRight: '16px' }} />
                  <Typography variant="bold2">Quoc Bao</Typography>
                </Box>
                <Box display="flex" alignItems="center" marginTop="16px">
                  <Avatar sx={{ marginRight: '16px' }} />
                  <Typography variant="bold2">Quoc Bao</Typography>
                </Box>
                <Box display="flex" alignItems="center" marginTop="16px">
                  <Avatar sx={{ marginRight: '16px' }} />
                  <Typography variant="bold2">Quoc Bao</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
