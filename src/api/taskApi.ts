import { AddTaskPayload } from 'features/Boards/components/form/AddTask';
import { Response } from 'models/common';
import { ITask } from 'models/task';
import axiosClient from './axiosClient';

const taskApi = {
  create(payload: AddTaskPayload): Promise<Response<ITask>> {
    return axiosClient.post('/tasks', payload);
  },
};

export default taskApi;
