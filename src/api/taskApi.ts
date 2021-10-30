import { AddTaskPayload } from 'features/Boards/components/form/AddTask';
import { Response } from 'models/common';
import { ITask } from 'models/task';
import axiosClient from './axiosClient';

const taskApi = {
  create(payload: AddTaskPayload): Promise<Response<ITask>> {
    return axiosClient.post(`/boards/${payload.boardId}/tasks`, payload);
  },
  update(payload: { boardId: string; taskId: string; data: Partial<ITask> }): Promise<Response<ITask>> {
    return axiosClient.put(`/boards/${payload.boardId}/tasks/${payload.taskId}`, payload.data);
  },
};

export default taskApi;
