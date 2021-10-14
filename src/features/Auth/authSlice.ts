import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import authApi from 'api/authApi';
import { Response } from 'models/common';
import { IUser } from 'models/user';
import { LoginFormValues } from './components/LoginForm';
import { RegisterFormValues } from './components/RegisterForm';

export interface AuthState {
  currentUser: IUser | null;
  isAuth: boolean;
}
const initialState: AuthState = {
  currentUser: null,
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
      localStorage.removeItem('access_token');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMe.pending, (state) => {});
    builder.addCase(getMe.rejected, (state) => {
      state.isAuth = false;
    });
    builder.addCase(getMe.fulfilled, (state, { payload }: PayloadAction<Response<any>>) => {
      state.isAuth = true;
      state.currentUser = payload.data.currentUser;
    });

    builder.addCase(login.pending, (state) => {});
    builder.addCase(login.rejected, (state) => {
      state.isAuth = false;
    });
    builder.addCase(login.fulfilled, (state) => {
      state.isAuth = true;
    });

    builder.addCase(register.pending, () => {});
    builder.addCase(register.rejected, (state) => {
      state.isAuth = false;
    });
    builder.addCase(register.fulfilled, (state) => {
      state.isAuth = true;
    });
  },
});

const { reducer: authReducer, actions } = authSlice;
export const { logout } = actions;
export default authReducer;
