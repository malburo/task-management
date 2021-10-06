import { LoginFormValues } from 'features/Auth/components/LoginForm';
import { RegisterFormValues } from 'features/Auth/components/RegisterForm';
import { Response } from 'models/common';
import { IUser } from 'models/user';
import axiosClient from './axiosClient';

const authApi = {
  getMe(): Promise<Response<IUser>> {
    return axiosClient.get('/auth/getMe');
  },
  login(payload: LoginFormValues): Promise<Response<string>> {
    return axiosClient.post('/auth/login', payload);
  },
  register(payload: RegisterFormValues): Promise<Response<string>> {
    return axiosClient.post('/auth/register', payload);
  },
  logout(): Promise<Response<string>> {
    return axiosClient.get('/auth/logout');
  },
};

export default authApi;
