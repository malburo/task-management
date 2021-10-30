import { Avatar, AvatarGroup, Box, Stack } from '@mui/material';
import { Container, Draggable, DropResult } from '@richardrout/react-smooth-dnd';
import boardApi from 'api/boardApi';
import { socketClient } from 'api/socketClient';
import { AppDispatch, RootState } from 'app/store';
import SideBar from 'components/SideBar';
import { IColumn } from 'models/column';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useParams } from 'react-router';
import { applyDrag } from 'utilities/dragDrop';
import { mapOrder } from 'utilities/sorts';
import { columnsSelector, getOneBoard, membersSelector, updateBoard } from '../boardSlice';
import Column from '../components/Column';
import AddColumn from '../components/form/AddColumn';
import AddMember from '../components/form/AddMember';
import EditVisibility from '../components/form/EditVisibility';
import Menu from '../components/Menu';
import '../style.css';
import TaskDetail from './TaskDetail';

interface Params {
  boardId: string;
}

const BoardDetail = () => {
  const dispatch = useDispatch<AppDispatch>();
  const board = useSelector((state: RootState) => state.board);
  const columns: IColumn[] = useSelector((state: RootState) => {
    const allTasks = columnsSelector.selectAll(state);
    return mapOrder(allTasks, board.columnOrder, '_id');
  });

  const members = useSelector(membersSelector.selectAll);
  const { boardId } = useParams<Params>();
  useEffect(() => {
    (async () => {
      await dispatch(getOneBoard({ boardId }));
    })();
  }, [dispatch, boardId]);

  useEffect(() => {
    socketClient.emit('board:join', boardId);
    return () => {
      socketClient.emit('board:leave', boardId);
    };
  }, [boardId]);

  if (!board) return <h1>empty</h1>;

  const onColumnDrop = async (dropResult: DropResult) => {
    try {
      if (dropResult.addedIndex === dropResult.removedIndex) return;
      const newColumns = applyDrag(columns, dropResult);
      const newColumnOrder = newColumns.map((column: IColumn) => column._id);
      await dispatch(updateBoard({ changes: { columnOrder: newColumnOrder } }));
      await boardApi.update({ boardId, data: { columnOrder: newColumnOrder } });
    } catch (error) {
      await dispatch(getOneBoard({ boardId }));
      console.log(error);
    }
  };
  return (
    <Stack direction="row">
      <SideBar />
      <Box height="100vh" bgcolor="#fff" flex={1} overflow="hidden">
        <Switch>
          <Route path={`/boards/:boardId/tasks/:taskId`} component={TaskDetail} />
        </Switch>
        <Box height="65px" />
        <Stack
          direction="row"
          height="55px"
          marginLeft="24px"
          marginTop="24px"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="row">
            <EditVisibility />
            <AvatarGroup max={10}>
              {members.map((member) => (
                <Avatar variant="rounded" src={member.profilePictureUrl} key={member._id} />
              ))}
            </AvatarGroup>
            <AddMember />
          </Stack>
          <Box marginRight="24px">
            <Menu />
          </Box>
        </Stack>
        <Box
          sx={{
            flex: '1 1',
            minWidth: 0,
            display: 'flex',
            overflowX: 'scroll',
          }}
          height="calc(100vh - 145px)"
        >
          <Container
            behaviour="contain"
            orientation="horizontal"
            disableScrollOverlapDetection={true}
            dragHandleSelector=".column-move"
            onDrop={onColumnDrop}
            getChildPayload={(index: number) => columns[index]}
            style={{
              minWidth: 0,
              overflowX: 'scroll',
            }}
          >
            {columns.map((column: IColumn) => (
              <Draggable key={column._id}>
                <Column column={column} />
              </Draggable>
            ))}
          </Container>
          <AddColumn />
        </Box>
      </Box>
    </Stack>
  );
};

export default BoardDetail;
