import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'features/Auth/authSlice';
import boardReducer from 'features/Boards/boardSlice';
import messagesReducer from 'features/Chat/ReduxSlice/MessagesSlice';
import roomReducer from 'features/Chat/ReduxSlice/RoomSlice';
import chatUIReducer from 'features/Chat/ReduxSlice/uiSlice';
import themeReducer from 'themeSlice';

const rootReducer = {
  auth: authReducer,
  board: boardReducer,
  room: roomReducer,
  theme: themeReducer,
  message: messagesReducer,
  chatUI: chatUIReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
