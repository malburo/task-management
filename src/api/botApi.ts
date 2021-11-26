import { Response } from 'models/common';
import { IMessage } from 'models/messages';
import axiosClient from './axiosClient';

const botApi = {
  sendRequest(payload: { roomId: string; content: string }): Promise<Response<IMessage>> {
    return axiosClient.post('/bot/request', payload);
  },
};

export default botApi;
