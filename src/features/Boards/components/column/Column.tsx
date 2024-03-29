/* eslint-disable react-hooks/exhaustive-deps */
import AddIcon from '@mui/icons-material/Add';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Box, Button, Divider, Menu, MenuItem, Paper, Typography } from '@mui/material';
import { Container, Draggable, DropResult } from '@richardrout/react-smooth-dnd';
import columnApi from 'api/columnApi';
import { AppDispatch, RootState } from 'app/store';
import { IColumn } from 'models/column';
import { ITask } from 'models/task';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { applyDrag } from 'utilities/dragDrop';
import { mapOrder } from 'utilities/sorts';
import { tasksSelector, updateColumn, updateTask } from '../../boardSlice';
import AddTask from '../task/AddTask';
import TaskCard from '../task/TaskCard';
import DeleteColumn from './DeleteColumn';
import EditColumnTitle from './EditColumTitle';

interface ColumnProps {
  column: IColumn;
  currentWorkflow: any;
  setCurrentWorkflow: any;
}

const Column: React.FC<ColumnProps> = ({ column, currentWorkflow, setCurrentWorkflow }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [showAddTaskForm, setShowAddTaskForm] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const scrollBottomRef = useRef<null | HTMLDivElement>(null);
  const didMount = useRef(false);
  const filterByLabels = useSelector((state: RootState) => state.board.filterByLabels);
  const filterByUsers = useSelector((state: RootState) => state.board.filterByUser);
  const tasks: ITask[] = useSelector((state: RootState) => {
    const allTasks = tasksSelector.selectAll(state).filter((task: ITask) => {
      if (filterByLabels === '' && filterByUsers === '') return task.columnId === column._id;
      if (filterByLabels === '' && filterByUsers !== '')
        return task.columnId === column._id && task.membersId.includes(filterByUsers);

      return task.columnId === column._id && task.labelsId.includes(filterByLabels);
    });
    return mapOrder(allTasks, column.taskOrder, '_id');
  });

  useEffect(() => {
    if (didMount.current) scrollBottomRef?.current?.scrollIntoView();
    didMount.current = true;
  }, [showAddTaskForm]);

  const onTaskDrop = async (columnId: string, dropResult: DropResult) => {
    if (dropResult.addedIndex === dropResult.removedIndex) {
      if (dropResult.addedIndex !== null && dropResult.removedIndex !== null) setCurrentWorkflow((prev: any) => []);
      return;
    }
    if (dropResult.addedIndex === null && dropResult.removedIndex === null) {
      return;
    }

    const newTasks = applyDrag(tasks, dropResult);
    const newTaskOrder = newTasks.map((task: ITask) => task._id);

    if (dropResult.addedIndex !== null && dropResult.removedIndex !== null) {
      setCurrentWorkflow((prev: any) => []);
      dispatch(updateColumn({ columnId, changes: { taskOrder: newTaskOrder } }));
      await columnApi.update({ columnId, data: { taskOrder: newTaskOrder, taskId: null } });
      return;
    }

    if (dropResult.addedIndex !== null) {
      if (!currentWorkflow?.includes(column._id) && currentWorkflow.length !== 1) {
        return setCurrentWorkflow([]);
      }
      const taskId = dropResult.payload._id;
      dispatch(updateColumn({ columnId, changes: { taskOrder: newTaskOrder } }));
      dispatch(updateTask({ taskId, changes: { columnId } }));
      await columnApi.update({ columnId, data: { taskOrder: newTaskOrder, taskId } });
      setCurrentWorkflow([]);
      return;
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleClickAddNewTask = () => {
    setAnchorEl(null);
    setShowAddTaskForm(true);
  };

  function onDropReady(dropResult: any) {
    if (dropResult.removedIndex === dropResult.addedIndex) {
      const workflow = [column._id, ...column.workflows];
      setCurrentWorkflow((prev: any) => workflow);
    }
  }
  return (
    <Box marginLeft={12} width="270px">
      <Paper elevation={0}>
        <Box
          bgcolor={
            currentWorkflow.length === 1 || currentWorkflow.length === 0 || currentWorkflow?.includes(column._id)
              ? 'secondary.main'
              : '#fd4a4a3b'
          }
        >
          <Box display="flex" justifyContent="space-between" height="40px" borderRadius="8px" paddingTop="8px">
            <EditColumnTitle columnId={column._id} value={column.title} />
            <Box onClick={handleMenuOpen} marginRight="12px" className="column-move" sx={{ cursor: 'move' }}>
              <MoreHorizIcon />
            </Box>
            <Menu
              id="column-menu"
              disableAutoFocusItem
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
              <MenuItem onClick={handleClickAddNewTask}>
                <Typography variant="regular2">Add Task...</Typography>
              </MenuItem>
              <Divider sx={{ margin: '10px 0px' }} />
              <DeleteColumn columnId={column._id} />
            </Menu>
          </Box>
          <Box
            sx={{ overflowY: 'auto', overflowX: 'hidden' }}
            maxHeight="calc(100vh - 280px)"
            padding="0 4px 0 12px"
            marginRight="8px"
            onDragOver={(e: any) => console.log('over')}
          >
            <Container
              disableScrollOverlapDetection={true}
              orientation="vertical"
              groupName="col"
              dragClass="card-ghost"
              dropClass="card-ghost-drop"
              getChildPayload={(index: number) => tasks[index]}
              onDrop={(dropResult) => onTaskDrop(column._id, dropResult)}
              dropPlaceholder={undefined}
              onDropReady={onDropReady}
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
              onClick={handleClickAddNewTask}
              variant="contained"
              color="secondary"
              fullWidth
              disabled={showAddTaskForm}
              endIcon={<AddIcon />}
              sx={{
                borderRadius: '0px 0px 8px 8px',
                height: '100%',
                padding: '8px 15px',
                boxShadow: 'none',
                justifyContent: 'space-between',
              }}
            >
              Add another card
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Column;
