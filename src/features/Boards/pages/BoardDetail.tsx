import { Avatar, AvatarGroup, Box } from '@material-ui/core';
import { Container, Draggable, DropResult } from '@richardrout/react-smooth-dnd';
import { AppDispatch } from 'app/store';
import { IColumn } from 'models/column';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { applyDrag } from 'utilities/dragDrop';
import { columnsSelector, dropColumn, getOneBoard, membersSelector, updateColumnOrder } from '../boardSlice';
import Column from '../components/Column';
import AddMember from '../components/form/AddMember';
import '../style.css';

interface Params {
  boardId: string;
}

const BoardDetail = () => {
  const dispatch = useDispatch<AppDispatch>();
  const columns = useSelector(columnsSelector.selectAll);
  const members = useSelector(membersSelector.selectAll);
  const { boardId } = useParams<Params>();
  useEffect(() => {
    (async () => {
      await dispatch(getOneBoard({ boardId }));
    })();
  }, [dispatch, boardId]);

  const onColumnDrop = async (dropResult: DropResult) => {
    if (dropResult.addedIndex === dropResult.removedIndex) return;
    const newColumns = applyDrag(columns, dropResult);
    const newColumnOrder = newColumns.map((column: IColumn) => column._id);
    await dispatch(dropColumn({ newColumns }));
    await dispatch(updateColumnOrder({ boardId, newColumnOrder }));
  };

  // if (!board) return <h1>empty</h1>;
  return (
    <Box className="content">
      <Box className="header">Header</Box>
      <Box>
        {/* <EditVisibility /> */}
        <AvatarGroup max={10}>
          {members.map((member: any) => (
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
          getChildPayload={(index: any) => columns[index]}
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: 'cards-drop-preview',
          }}
        >
          {columns.map((column: IColumn) => (
            <Draggable key={column._id}>
              <Box margin="0px 24px">
                <span className="column-drag-handle">title</span>
                <Column column={column} />
              </Box>
            </Draggable>
          ))}
        </Container>
      </Box>
    </Box>
  );
};

export default BoardDetail;
