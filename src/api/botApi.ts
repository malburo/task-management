import { Response } from 'models/common';
import { IMessage } from 'models/messages';
import { ITask } from 'models/task';
import axiosClient from './axiosClient';

const botApi = {
  sendRequest(payload: { roomId: string; content: string }): Promise<Response<IMessage>> {
    return axiosClient.post('/bot/request', payload);
  },
  createMessage(payload: { roomId: string; content: string }): Promise<Response<ITask>> {
    return axiosClient.post(`/bot/message`, payload);
  },
};

export default botApi;
