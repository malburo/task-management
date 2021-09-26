/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Typography } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { Container, Draggable, DropResult } from '@richardrout/react-smooth-dnd';
import { AppDispatch, RootState } from 'app/store';
import { IColumn } from 'models/column';
import { ITask } from 'models/task';
import { useDispatch, useSelector } from 'react-redux';
import { applyDrag } from 'utilities/dragDrop';
import { mapOrder } from 'utilities/sorts';
import { drogTask, tasksSelector, updateTaskOrder } from '../boardSlice';
import TaskCard from './TaskCard';

interface ColumnProps {
  column: IColumn;
}

const Column: React.FC<ColumnProps> = ({ column }) => {
  const dispatch = useDispatch<AppDispatch>();

  const tasks = useSelector((state: RootState) => {
    const allTasks = tasksSelector.selectAll(state).filter((task: ITask) => task.columnId === column._id);
    return mapOrder(allTasks, column.taskOrder, '_id');
  });

  const onTaskDrop = async (columnId: string, dropResult: DropResult) => {
    if (dropResult.addedIndex === dropResult.removedIndex) return;
    if (dropResult.addedIndex === null && dropResult.removedIndex === null) return;

    const newTasks = applyDrag(tasks, dropResult);
    const newTaskOrder = newTasks.map((task: ITask) => task._id);

    if (dropResult.addedIndex !== null && dropResult.removedIndex !== null) {
      dispatch(drogTask({ columnId, changes: { taskOrder: newTaskOrder } }));
      dispatch(updateTaskOrder({ columnId, taskOrder: newTaskOrder }));
      return;
    }

    if (dropResult.addedIndex !== null) {
      dispatch(drogTask({ columnId, changes: { taskOrder: newTaskOrder }, taskId: dropResult.payload._id }));
      dispatch(updateTaskOrder({ columnId, taskOrder: newTaskOrder, taskId: dropResult.payload._id }));
      return;
    }
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
