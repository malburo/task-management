import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import messageApi from 'api/messageApi';
import { RootState } from 'app/store';
import { IMessage } from 'models/messages';

export const getMessageInRoom = createAsyncThunk('room/getMessageInRoom', async (payload: any) => {
  const { data } = await messageApi.getAllInRoom({ id: payload.id, seed: payload.seed });
  return { messages: data.rs };
});
export const updateOne = createAsyncThunk('room/updateOne', async (payload: any) => {
  const { data } = await messageApi.update({
    messageId: payload.messageId,
    data: { msgContent: payload.msgContent, roomId: payload.roomId },
  });
  return { id: payload.messageId, content: data.updatedMessage.content };
});
export const deleteOne = createAsyncThunk('room/deleteOne', async (payload: any) => {
  await messageApi.deleteOne({ messageId: payload.messageId });
  return { id: payload.messageId };
});

const messagesAdapter = createEntityAdapter({
  selectId: (message: IMessage) => message._id,
});

export const messagesSeletor = messagesAdapter.getSelectors((state: RootState) => state.message.messages);

const messagesSlice = createSlice({
  name: 'room',
  initialState: {
    isLoading: true,
    seed: 0,
    response: {
      message: '',
      status: 0,
    },
    messages: messagesAdapter.getInitialState(),
  },
  reducers: {
    clearResponse: (state) => {
      state.response = { message: '', status: 0 };
    },
    increaseSeed: (state) => {
      state.seed++;
    },
    addNewMessage: (state, action: PayloadAction<IMessage>) => {
      messagesAdapter.addOne(state.messages, action.payload);
    },
    removeOneMessage: (state, action: PayloadAction<string>) => {
      messagesAdapter.removeOne(state.messages, action.payload);
    },
    editOneMessage: (state, action: PayloadAction<IMessage>) => {
      const { _id, ...changes } = action.payload;
      messagesAdapter.updateOne(state.messages, { id: _id, changes });
    },
    throwErr: (state, action: PayloadAction<string>) => {
      state.response = { message: action.payload, status: -1 };
    },
    throwNotification: (state, action: PayloadAction<string>) => {
      state.response = { message: action.payload, status: 1 };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMessageInRoom.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getMessageInRoom.rejected, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getMessageInRoom.fulfilled, (state, { payload }: PayloadAction<any>) => {
      messagesAdapter.removeAll(state.messages);
      messagesAdapter.setAll(state.messages, payload.messages);
      state.isLoading = false;
    });
    builder.addCase(updateOne.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateOne.rejected, (state) => {
      state.isLoading = false;
      state.response = { message: 'Failed to update this message', status: -1 };
    });
    builder.addCase(updateOne.fulfilled, (state, { payload }: PayloadAction<any>) => {
      const { id, ...changes } = payload;
      messagesAdapter.updateOne(state.messages, { id, changes });
      state.isLoading = false;
      state.response = { message: 'Updated', status: 1 };
    });
    builder.addCase(deleteOne.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteOne.rejected, (state) => {
      state.isLoading = false;
      state.response = { message: 'Failed to delete this message', status: -1 };
    });
    builder.addCase(deleteOne.fulfilled, (state, { payload }: PayloadAction<any>) => {
      messagesAdapter.removeOne(state.messages, payload.id);
      state.isLoading = false;
      state.response = { message: 'Deleted', status: 1 };
    });
  },
});
// eslint-disable-next-line
const { actions, reducer: messagesReducer } = messagesSlice;
export const { addNewMessage, clearResponse, removeOneMessage, editOneMessage, throwErr, throwNotification } = actions;
export default messagesReducer;
