import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import authApi, { GetMeResponse } from 'api/authApi';
import { Response } from 'models/common';
import { IUser } from 'models/user';
import { LoginFormValues } from './components/LoginForm';
import { RegisterFormValues } from './components/RegisterForm';

export interface AuthState {
  currentUser: IUser;
  isAuth: boolean;
}
const initialState = {
  currentUser: {},
  isAuth: !!localStorage.getItem('access_token'),
};

export const getMe = createAsyncThunk('auth/getMe', async (payload, thunkAPI) => {
  const currentUser = await authApi.getMe();
  return currentUser;
});

export const login = createAsyncThunk('auth/login', async (payload: LoginFormValues, thunkAPI) => {
  const response = await authApi.login(payload);
  localStorage.setItem('access_token', response.data.access_token);
  thunkAPI.dispatch(getMe());
  return response;
});
export const register = createAsyncThunk('auth/register', async (payload: RegisterFormValues, thunkAPI) => {
  const response = await authApi.register(payload);
  localStorage.setItem('access_token', response.data.access_token);
  thunkAPI.dispatch(getMe());
  return response;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuth = false;
      localStorage.removeItem('access-token');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMe.pending, (state) => {});
    builder.addCase(getMe.rejected, (state) => {
      state.isAuth = false;
    });
    builder.addCase(getMe.fulfilled, (state, action: PayloadAction<Response<GetMeResponse>>) => {
      state.isAuth = true;
      state.currentUser = action.payload.data.currentUser;
    });
  },
});

const { reducer: authReducer, actions } = authSlice;
export const { logout } = actions;
export default authReducer;