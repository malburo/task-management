/* eslint-disable react-hooks/exhaustive-deps */
import AddIcon from '@mui/icons-material/Add';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Box, Button, Typography } from '@mui/material';
import { Container, Draggable, DropResult } from '@richardrout/react-smooth-dnd';
import columnApi from 'api/columnApi';
import { AppDispatch, RootState } from 'app/store';
import { IColumn } from 'models/column';
import { ITask } from 'models/task';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { applyDrag } from 'utilities/dragDrop';
import { mapOrder } from 'utilities/sorts';
import { tasksSelector, updateColumn, updateTask } from '../boardSlice';
import AddTask from './form/AddTask';
import TaskCard from './TaskCard';

interface ColumnProps {
  column: IColumn;
}

const Column: React.FC<ColumnProps> = ({ column }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [showAddTaskForm, setShowAddTaskForm] = useState<boolean>(false);
  const scrollBottomRef = useRef<null | HTMLDivElement>(null);
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) scrollBottomRef?.current?.scrollIntoView();
    didMount.current = true;
  }, [showAddTaskForm]);

  const tasks: ITask[] = useSelector((state: RootState) => {
    const allTasks = tasksSelector.selectAll(state).filter((task: ITask) => task.columnId === column._id);
    return mapOrder(allTasks, column.taskOrder, '_id');
  });

  const onTaskDrop = async (columnId: string, dropResult: DropResult) => {
    if (dropResult.addedIndex === dropResult.removedIndex) return;
    if (dropResult.addedIndex === null && dropResult.removedIndex === null) return;

    const newTasks = applyDrag(tasks, dropResult);
    const newTaskOrder = newTasks.map((task: ITask) => task._id);

    if (dropResult.addedIndex !== null && dropResult.removedIndex !== null) {
      dispatch(updateColumn({ columnId, changes: { taskOrder: newTaskOrder } }));
      await columnApi.update({ columnId, data: { taskOrder: newTaskOrder, taskId: null } });
      return;
    }

    if (dropResult.addedIndex !== null) {
      const taskId = dropResult.payload._id;
      dispatch(updateColumn({ columnId, changes: { taskOrder: newTaskOrder } }));
      dispatch(updateTask({ taskId, changes: { columnId } }));
      await columnApi.update({ columnId, data: { taskOrder: newTaskOrder, taskId } });
      return;
    }
  };

  return (
    <Box marginX={6} bgcolor="#f8f9fd" borderRadius="8px" padding="8px" border="2px solid #0000000a" width="280px">
      <Box display="flex" justifyContent="space-between" height="40px">
        <Typography variant="regular3" className="column-drag-handle">
          {column.title}
        </Typography>
        <MoreHorizIcon />
      </Box>
      <Box sx={{ overflowY: 'scroll', overflowX: 'hidden' }} maxHeight="calc(100vh - 280px)" padding="0 4px 0 12px">
        <Container
          disableScrollOverlapDetection={true}
          orientation="vertical"
          groupName="col"
          dragClass="card-ghost"
          dropClass="card-ghost-drop"
          getChildPayload={(index: number) => tasks[index]}
          onDrop={(dropResult) => onTaskDrop(column._id, dropResult)}
          dropPlaceholder={{
            animationDuration: 150,
            className: 'drop-preview',
          }}
          style={{ minHeight: '50px' }}
        >
          {tasks.map((task: ITask) => (
            <Draggable key={task._id}>
              <TaskCard task={task} />
            </Draggable>
          ))}
        </Container>
        {showAddTaskForm && <AddTask columnId={column._id} setShowAddTaskForm={setShowAddTaskForm} />}
        <div ref={scrollBottomRef} />
      </Box>
      <Box height="40px" marginTop="12px">
        <Button
          onClick={() => setShowAddTaskForm(true)}
          variant="contained"
          fullWidth
          disabled={showAddTaskForm}
          endIcon={<AddIcon />}
          sx={{
            background: '#DAE4FD',
            borderRadius: '8px',
            color: '#2F80ED',
            height: '100%',
            padding: '8px 15px',
            boxShadow: 'none',
            span: {
              justifyContent: 'space-between',
            },
          }}
        >
          Add another card
        </Button>
      </Box>
    </Box>
  );
};

export default Column;
