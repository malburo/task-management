/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Typography } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { Container, Draggable, DropResult } from '@richardrout/react-smooth-dnd';
import { AppDispatch } from 'app/store';
import { IColumn } from 'models/column';
import { ITask } from 'models/task';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { mapOrder } from 'utilities/sorts';
import { updateColumn, updateTasksRedux } from '../boardSlice';
import TaskCard from './TaskCard';

interface ColumnProps {
  column: IColumn;
}

const Column: React.FC<ColumnProps> = ({ column }) => {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = mapOrder(column.tasks, column.taskOrder, '_id');

  useEffect(() => {
    dispatch(updateTasksRedux({ columnId: column._id }));
  }, []);

  const onTaskDrop = (columnId: string, dropResult: DropResult) => {
    if (dropResult.addedIndex === dropResult.removedIndex) return;
    if (dropResult.addedIndex === null && dropResult.removedIndex === null) return;
    if (dropResult.addedIndex !== null && dropResult.removedIndex !== null) {
      return dispatch(updateColumn({ columnId, dropResult }));
    }
    if (dropResult.addedIndex !== null) {
      const dropResultClone = JSON.parse(JSON.stringify(dropResult));
      dropResultClone.payload.columnId = column._id;
      return dispatch(updateColumn({ columnId, dropResult: dropResultClone, taskId: dropResultClone.payload._id }));
    }
    dispatch(updateColumn({ columnId, dropResult }));
  };

  return (
    <Box display="flex" flexDirection="column">
      <Box display="flex" justifyContent="space-between" height="50px">
        <Typography variant="regular3">Title</Typography>
        <MoreHorizIcon />
      </Box>
      <Box height="65vh" overflow="scroll">
        <Container
          disableScrollOverlapDetection={true}
          orientation="vertical"
          groupName="col"
          dragClass="card-ghost"
          dropClass="card-ghost-drop"
          getChildPayload={(index: any) => tasks[index]}
          onDrop={(dropResult) => onTaskDrop(column._id, dropResult)}
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: 'drop-preview',
          }}
        >
          {tasks.map((task: ITask) => (
            <Draggable key={task._id}>
              <TaskCard task={task} />
            </Draggable>
          ))}
        </Container>
      </Box>
    </Box>
  );
};

export default Column;
