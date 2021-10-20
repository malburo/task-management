import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import messageApi from 'api/messageApi';
import { RootState } from 'app/store';
import { IMessage } from 'models/messages';

export const getMessageInRoom = createAsyncThunk('room/getMessageInRoom', async (payload: any) => {
  const { data } = await messageApi.getAllInRoom({ id: payload.id, seed: payload.seed });
  return { messages: data.messages, seed: payload.seed };
});
export const updateOne = createAsyncThunk('room/updateOne', async (payload: any) => {
  const { data } = await messageApi.update({
    messageId: payload.messageId,
    data: { msgContent: payload.msgContent, roomId: payload.roomId },
  });
  return { id: payload.messageId, content: data.updatedMessage.content };
});
export const createOne = createAsyncThunk('room/createOne', async (payload: any) => {
  const { data } = await messageApi.create({
    roomId: payload.roomId,
    content: payload.content,
  });
  return data.message as IMessage;
});
export const deleteOne = createAsyncThunk('room/deleteOne', async (payload: any) => {
  await messageApi.deleteOne({ messageId: payload.messageId });
  return { id: payload.messageId };
});

const messagesAdapter = createEntityAdapter<IMessage>({
  selectId: (message) => message._id,
  sortComparer: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
});

export const messagesSeletor = messagesAdapter.getSelectors((state: RootState) => state.message.messages);

const messagesSlice = createSlice({
  name: 'room',
  initialState: {
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
    throwNotification: (state, action: PayloadAction<string>) => {
      state.response.message = action.payload;
      state.response.status = -1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMessageInRoom.pending, (state) => {});
    builder.addCase(getMessageInRoom.rejected, (state) => {});
    builder.addCase(getMessageInRoom.fulfilled, (state, { payload }: PayloadAction<any>) => {
      if (payload.seed === 0) messagesAdapter.removeAll(state.messages);
      messagesAdapter.addMany(state.messages, payload.messages);
    });
    builder.addCase(updateOne.pending, (state) => {});
    builder.addCase(updateOne.rejected, (state) => {
      state.response = { message: 'Failed to update this message', status: -1 };
    });
    builder.addCase(updateOne.fulfilled, (state, { payload }: PayloadAction<any>) => {
      const { id, ...changes } = payload;
      messagesAdapter.updateOne(state.messages, { id, changes });
      state.response = { message: 'Updated', status: 1 };
    });
    builder.addCase(deleteOne.pending, (state) => {});
    builder.addCase(deleteOne.rejected, (state) => {
      state.response = { message: 'Failed to delete this message', status: -1 };
    });
    builder.addCase(deleteOne.fulfilled, (state, { payload }: PayloadAction<any>) => {
      messagesAdapter.removeOne(state.messages, payload.id);
      state.response = { message: 'Deleted', status: 1 };
    });
    builder.addCase(createOne.pending, (state) => {});
    builder.addCase(createOne.rejected, (state) => {
      state.response = { message: 'Failed to send this message', status: -1 };
    });
    builder.addCase(createOne.fulfilled, (state, { payload }: PayloadAction<any>) => {
      messagesAdapter.addOne(state.messages, payload);
    });
  },
});
// eslint-disable-next-line
const { actions, reducer: messagesReducer } = messagesSlice;
export const { addNewMessage, clearResponse, removeOneMessage, editOneMessage, throwNotification } = actions;
export default messagesReducer;
