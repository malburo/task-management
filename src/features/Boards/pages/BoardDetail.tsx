import { Box } from '@material-ui/core';
import { Container, Draggable, DropResult } from '@richardrout/react-smooth-dnd';
import { AppDispatch, RootState } from 'app/store';
import { IColumn } from 'models/column';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneBoard, updateBoard } from '../boardSlice';
import Column from '../components/Column';
import '../style.css';

const BoardDetail = () => {
  const dispatch = useDispatch<AppDispatch>();
  const board = useSelector((state: RootState) => state.board.data);
  useEffect(() => {
    (async () => {
      const payload = {
        boardId: '6127c092b552760438485de3',
      };
      await dispatch(getOneBoard(payload));
    })();
  }, [dispatch]);

  const onColumnDrop = (dropResult: DropResult) => {
    if (dropResult.addedIndex === dropResult.removedIndex) return;
    dispatch(updateBoard({ boardId: '6127c092b552760438485de3', dropResult }));
  };

  if (!board) return <h1>empty</h1>;
  return (
    <Box className="content">
      <Box className="header">Header</Box>
      <Box className="demo">
        <Container
          disableScrollOverlapDetection={true}
          orientation="horizontal"
          onDrop={onColumnDrop}
          dragHandleSelector=".column-drag-handle"
          getChildPayload={(index: any) => board.columns[index]}
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: 'cards-drop-preview',
          }}
        >
          {board.columns.map((column: IColumn) => (
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
