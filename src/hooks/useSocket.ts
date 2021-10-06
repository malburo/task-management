import { socketClient } from 'api/socketClient';
import { AppDispatch } from 'app/store';
import { addColumn, addTask, updateBoard, updateColumn, updateTask } from 'features/Boards/boardSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useSocket = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    (async () => {
      socketClient.on('connect', () => {
        console.log(`I'm connected with the back-end`);
      });
      socketClient.on('board:update', (updatedBoard) => {
        dispatch(updateBoard({ changes: updatedBoard }));
      });

      socketClient.on('column:create', ({ newColumn, newColumnOrder }) => {
        dispatch(addColumn({ newColumn }));
        dispatch(updateBoard({ changes: { columnOrder: newColumnOrder } }));
      });
      socketClient.on('column:update', (updatedColumn) => {
        dispatch(updateColumn({ columnId: updatedColumn._id, changes: updatedColumn }));
      });

      socketClient.on('task:create', ({ newTask, newTaskOrder }) => {
        dispatch(addTask({ newTask }));
        dispatch(updateColumn({ columnId: newTask.columnId, changes: { taskOrder: newTaskOrder } }));
      });
      socketClient.on('task:update', (updatedTask) => {
        dispatch(updateTask({ taskId: updatedTask._id, changes: updatedTask }));
      });
    })();
    return () => {
      socketClient?.disconnect();
    };
  }, [dispatch]);
  return socketClient;
};
export default useSocket;
