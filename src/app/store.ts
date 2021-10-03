import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'features/Auth/authSlice';
import boardReducer from 'features/Boards/boardSlice';
import roomReducer from 'features/Chat/ReduxSlice/RoomSlice';
import appchatUIReducer from 'features/Chat/ReduxSlice/SidebarAppChatSlice';

const rootReducer = {
  auth: authReducer,
  board: boardReducer,
  appchatUI: appchatUIReducer,
  room: roomReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
