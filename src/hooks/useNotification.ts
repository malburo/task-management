import { useHistory } from 'react-router-dom';

const useNotification = () => {
  const history = useHistory();
  return [
    {
      type: 'BOARD:ADD_MEMBER',
      message(newNotification: any) {
        return `${newNotification.senderId.username} invited you to ${newNotification.content.board.title}`;
      },
      onClick(newNotification: any) {
        history.push(`/boards/${newNotification.boardId}`);
      },
    },
    {
      type: 'TASK:DEADLINE_EXPIRED',
      message(newNotification: any) {
        return `${newNotification.content.task.title} has expired`;
      },
      onClick(newNotification: any) {
        history.push(`/boards/${newNotification.boardId}/tasks/${newNotification.content.task._id}`);
      },
    },
    {
      type: 'TASK:REMINDER',
      message(newNotification: any) {
        return `${newNotification.content.task.title} is about to expire`;
      },
      onClick(newNotification: any) {
        history.push(`/boards/${newNotification.boardId}/tasks/${newNotification.content.task._id}`);
      },
    },
    {
      type: 'TASK:ASSIGN_MEMBER',
      message(newNotification: any) {
        return `${newNotification.senderId.username} was assigned ${newNotification.content.task.title} to you`;
      },
      onClick(newNotification: any) {
        history.push(`/boards/${newNotification.boardId}/tasks/${newNotification.content.task._id}`);
      },
    },
    {
      type: 'TASK:REASSIGN_MEMBER',
      message(newNotification: any) {
        return `${newNotification.senderId.username} was reassigned ${newNotification.content.task.title} to you`;
      },
      onClick(newNotification: any) {
        history.push(`/boards/${newNotification.boardId}/tasks/${newNotification.content.task._id}`);
      },
    },
  ];
};

export default useNotification;
