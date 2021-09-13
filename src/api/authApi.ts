import { LoginFormValues } from 'features/Auth/components/LoginForm';
import { RegisterFormValues } from 'features/Auth/components/RegisterForm';
import { Response } from 'models/common';
import { IUser } from 'models/user';
import axiosClient from './axiosClient';

export interface GetMeResponse {
  currentUser: IUser;
  message: string;
}

const authApi = {
  getMe(): Promise<Response<GetMeResponse>> {
    return axiosClient.get('/auth/getMe');
  },
  login(data: LoginFormValues): Promise<Response<string>> {
    return axiosClient.post('/auth/login', data);
  },
  register(data: RegisterFormValues): Promise<Response<string>> {
    return axiosClient.post('/auth/register', data);
  },
  logout(): Promise<Response<string>> {
    return axiosClient.get('/auth/logout');
  },
};

export default authApi;
