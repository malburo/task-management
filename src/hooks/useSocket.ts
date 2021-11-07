import { socketClient } from 'api/socketClient';
import { AppDispatch } from 'app/store';
import {
  addColumn,
  addLabel,
  addTask,
  updateBoard,
  updateColumn,
  updateLabel,
  updateTask,
} from 'features/Boards/boardSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addMember, deleteColumn } from './../features/Boards/boardSlice';

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
      socketClient.on('column:delete', (deletedColumn) => {
        dispatch(deleteColumn({ columnId: deletedColumn._id }));
      });

      socketClient.on('task:create', ({ newTask, newTaskOrder }) => {
        dispatch(addTask({ newTask }));
        dispatch(updateColumn({ columnId: newTask.columnId, changes: { taskOrder: newTaskOrder } }));
      });
      socketClient.on('task:update', (updatedTask) => {
        dispatch(updateTask({ taskId: updatedTask._id, changes: updatedTask }));
      });

      socketClient.on('member:create', (newMember) => {
        dispatch(addMember({ newMember }));
      });
      socketClient.on('member:remove', (newMember) => {
        dispatch(addMember({ newMember }));
      });

      socketClient.on('label:create', (newLabel) => {
        dispatch(addLabel({ newLabel }));
      });
      socketClient.on('label:update', (updatedLabel) => {
        dispatch(updateLabel({ labelId: updatedLabel._id, changes: updatedLabel }));
      });
    })();
    return () => {
      socketClient?.disconnect();
    };
  }, [dispatch]);
  return socketClient;
};
export default useSocket;
