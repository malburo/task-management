import React, { ReactElement, useEffect, useState } from 'react';
import dateUtil from 'utilities/dateUtil';
import TimeLine from '../HorizontalRule/TimeLine';
import { Box } from '@mui/system';
import { Avatar, Button, Dialog, DialogContent, DialogTitle, Tooltip, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'app/store';
import { IUser } from 'models/user';
import ISelectFormMessage from 'models/selectMessage';
import AccountPreview from '../AccountPreview';
import InputField from 'components/form-control/InputField';
import { useForm } from 'react-hook-form';
import columnApi from 'api/columnApi';
import { columnsSelector, getOneBoard, updateBoard } from 'features/Boards/boardSlice';
import taskApi from 'api/taskApi';
import botApi from 'api/botApi';
import { applyDrag } from 'utilities/dragDrop';
import { mapOrder } from 'utilities/sorts';
import { IColumn } from 'models/column';
import boardApi from 'api/boardApi';
import { Container, Draggable, DropResult } from '@richardrout/react-smooth-dnd';
import ColumnInChat from '../ColumnInChat';
import { AddColumnFormValues, AddTaskFormValues, createColumnScheme, createTaskScheme } from './form';
import { yupResolver } from '@hookform/resolvers/yup';
import useBotMessageStyles from './style';

interface IProps {
  postedDate: Date;
  content: string;
  renderTimeLine: Boolean;
  time: Date;
  type: Number;
  owner: IUser;
  form?: ISelectFormMessage;
}

const BotMessage: React.FC<IProps> = (props) => {
  const { content, renderTimeLine, type } = props;
  const style = useBotMessageStyles();
  const [timeline, setTimeline] = useState<ReactElement>();
  const room = useSelector((state: RootState) => state.room.roomInfor);
  const board = useSelector((state: RootState) => state.board);
  const columns: IColumn[] = useSelector((state: RootState) => {
    const allTasks = columnsSelector.selectAll(state);
    return mapOrder(allTasks, board.columnOrder, '_id');
  });
  const [openDialogColumn, setOpenDialogColumn] = useState<boolean>(type === 4);
  const [openDialogTask, setOpenDialogTask] = useState<boolean>(type === 5);
  const [openDragColumn, setOpenDragColumn] = useState<boolean>(type === 6);
  const [idChoose, setIdChoose] = useState<string>(columns[0]?._id);
  const [openTooltip, setOpenTooltip] = React.useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const sendForm = useForm<AddColumnFormValues>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      title: '',
    },
    resolver: yupResolver(createColumnScheme),
  });

  const createTaskForm = useForm<AddTaskFormValues>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      title: '',
      column: '',
    },
    resolver: yupResolver(createTaskScheme),
  });

  const handleCloseDialog = () => {
    setOpenDialogColumn(false);
    setOpenDialogTask(false);
    setOpenDragColumn(false);
  };

  useEffect(() => {
    if (renderTimeLine === true) setTimeline(<TimeLine time={new Date(props.time)} />);
    // eslint-disable-next-line
  }, [renderTimeLine]);

  const onSubmit = async (values: AddColumnFormValues) => {
    try {
      await columnApi.create({ boardId: room.board._id, title: values.title });
      await botApi.createMessage({ roomId: room._id, content: `Done! Let's check it out` });
    } catch (error) {
      await botApi.createMessage({ roomId: room._id, content: `Opps! Something with system went wrong` });
    }
    setOpenDialogColumn(false);
    sendForm.reset();
  };

  const handleCreateTask = async (values: AddTaskFormValues) => {
    try {
      const payload = { boardId: room.board._id, columnId: values.column, ...values };
      await taskApi.create(payload);
      await botApi.createMessage({ roomId: room._id, content: `Done! Let's check it out` });
    } catch (error) {
      await botApi.createMessage({ roomId: room._id, content: `Opps! Something with system went wrong` });
    }
    setOpenDialogTask(false);
    createTaskForm.reset();
  };

  useEffect(() => {
    createTaskForm.setValue('column', idChoose);
    // eslint-disable-next-line
  }, [idChoose]);

  const onColumnDrop = async (dropResult: DropResult) => {
    try {
      if (dropResult.addedIndex === dropResult.removedIndex) return;
      const newColumns = applyDrag(columns, dropResult);
      const newColumnOrder = newColumns.map((column: IColumn) => column._id);
      await dispatch(updateBoard({ changes: { columnOrder: newColumnOrder } }));
      await boardApi.update({ boardId: board._id, data: { columnOrder: newColumnOrder } });
    } catch (error) {
      await dispatch(getOneBoard({ boardId: board._id }));
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      {timeline}
      <Box className={style.message}>
        <Box className={style.avatar}>
          <Tooltip arrow placement="top" open={openTooltip} title={<AccountPreview value={props.owner} />}>
            <Avatar
              onMouseEnter={() => setOpenTooltip(true)}
              onMouseLeave={() => setOpenTooltip(false)}
              className={style.avatarImg}
              alt="none"
              src={props.owner.profilePictureUrl}
            />
          </Tooltip>
        </Box>
        <Box>
          <Box flex="true">
            {type === 4 && (
              <Box className={style.messageContent}>
                <Typography variant="body2" sx={{ maxWidth: '60vw', overflowX: 'hidden' }}>
                  {content}
                </Typography>
                <Dialog open={openDialogColumn}>
                  <DialogTitle>
                    Create Column
                    <Button sx={{ float: 'right' }} variant="contained" onClick={handleCloseDialog}>
                      X
                    </Button>
                  </DialogTitle>
                  <DialogContent sx={{ width: '40vw' }}>
                    <form onSubmit={sendForm.handleSubmit(onSubmit)}>
                      <InputField name="title" placeholder="type the column's title here" form={sendForm} />
                      <Button sx={{ float: 'right', marginTop: '30px' }} variant="contained">
                        Add
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </Box>
            )}
            {type === 5 && (
              <Box className={style.messageContent}>
                <Typography variant="body2" sx={{ maxWidth: '60vw', overflowX: 'hidden' }}>
                  {content}
                </Typography>
                <Dialog open={openDialogTask}>
                  <DialogTitle>
                    Create Task
                    <Button sx={{ float: 'right' }} variant="contained" onClick={handleCloseDialog}>
                      X
                    </Button>
                  </DialogTitle>
                  <DialogContent sx={{ width: '40vw' }}>
                    <form onSubmit={createTaskForm.handleSubmit(handleCreateTask)}>
                      {columns.map((i) => (
                        <Button
                          fullWidth
                          onClick={() => setIdChoose(i._id)}
                          variant={i._id === idChoose ? 'contained' : 'outlined'}
                          sx={{ height: '50px', margin: '10px 0 10px 0' }}
                        >
                          {i.title}
                        </Button>
                      ))}
                      <InputField name="title" placeholder="type the title of task here" form={createTaskForm} />
                      <Button sx={{ float: 'right', marginTop: '30px' }} variant="contained">
                        Add
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </Box>
            )}
            {type === 6 && (
              <Box className={style.messageContent}>
                <Typography variant="body2" sx={{ maxWidth: '60vw', overflowX: 'hidden' }}>
                  {content}
                </Typography>
                <Dialog open={openDragColumn}>
                  <DialogTitle>
                    Modify Column
                    <Button sx={{ float: 'right' }} variant="contained" onClick={handleCloseDialog}>
                      X
                    </Button>
                  </DialogTitle>
                  <DialogContent sx={{ width: '40vw' }}>
                    <Container
                      behaviour="contain"
                      orientation="vertical"
                      disableScrollOverlapDetection={true}
                      onDrop={onColumnDrop}
                      getChildPayload={(index: number) => columns[index]}
                      style={{
                        minWidth: 0,
                        overflowX: 'scroll',
                      }}
                    >
                      {columns.map((column: IColumn) => (
                        <Draggable key={column._id}>
                          <ColumnInChat column={column} />
                        </Draggable>
                      ))}
                    </Container>
                  </DialogContent>
                </Dialog>
              </Box>
            )}
            {type === 1 && (
              <Box className={style.messageContent}>
                <Typography variant="body2" sx={{ maxWidth: '60vw', overflowX: 'hidden' }}>
                  {content}
                </Typography>
              </Box>
            )}
          </Box>
          <Box className={style.accountInfor}>
            <Typography sx={{ fontSize: '0.75em' }} variant="subtitle2">
              {dateUtil.fortmatDate(props.postedDate)}
            </Typography>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default BotMessage;
