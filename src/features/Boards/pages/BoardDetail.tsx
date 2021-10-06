import { Avatar, AvatarGroup, Box } from '@material-ui/core';
import { Container, Draggable, DropResult } from '@richardrout/react-smooth-dnd';
import boardApi from 'api/boardApi';
import { socketClient } from 'api/socketClient';
import { AppDispatch, RootState } from 'app/store';
import { IColumn } from 'models/column';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { applyDrag } from 'utilities/dragDrop';
import { mapOrder } from 'utilities/sorts';
import { columnsSelector, getOneBoard, membersSelector, updateBoard } from '../boardSlice';
import Column from '../components/Column';
import AddColumn from '../components/form/AddColumn';
import AddMember from '../components/form/AddMember';
import '../style.css';

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
    <Box className="content">
      <Box className="header">Header</Box>
      <Box>
        {/* <EditVisibility /> */}
        <AvatarGroup max={10}>
          {members.map((member) => (
            <Avatar variant="rounded" src={member.profilePictureUrl} key={member._id} />
          ))}
        </AvatarGroup>
        <AddMember />
      </Box>
      <Box className="demo">
        <Container
          disableScrollOverlapDetection={true}
          orientation="horizontal"
          onDrop={onColumnDrop}
          dragHandleSelector=".column-drag-handle"
          getChildPayload={(index: number) => columns[index]}
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: 'cards-drop-preview',
          }}
        >
          {columns.map((column: IColumn) => (
            <Draggable key={column._id}>
              <Box margin="0px 24px">
                <span className="column-drag-handle">{column.title}</span>
                <Column column={column} />
              </Box>
            </Draggable>
          ))}
          <AddColumn />
        </Container>
      </Box>
    </Box>
  );
};

export default BoardDetail;
