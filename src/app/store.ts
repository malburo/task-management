import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'features/Auth/authSlice';
import boardReducer from 'features/Boards/boardSlice';
import themeReducer from 'themeSlice';

const rootReducer = {
  auth: authReducer,
  board: boardReducer,
  theme: themeReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
