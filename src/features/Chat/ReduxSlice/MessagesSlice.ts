import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import messageApi from 'api/messageApi';
import { RootState } from 'app/store';
import { IMessage } from 'models/messages';

export const getMessageInRoom = createAsyncThunk(
  'room/getMessageInRoom',
  async (payload: { id: string; seed: number }) => {
    const { data } = await messageApi.getAllInRoom(payload.id, payload.seed);
    return { messages: data.messages, seed: payload.seed };
  }
);

interface IResultMessages {
  messages: IMessage[];
  seed: number;
}

export const updateOne = createAsyncThunk('room/updateOne', async (payload: Pick<IMessage, '_id' | 'content'>) => {
  const { data } = await messageApi.update(payload);
  return data.updatedMessage;
});
export const createOne = createAsyncThunk('room/createOne', async (payload: Pick<IMessage, '_id' | 'content'>) => {
  const { data } = await messageApi.create({
    _id: payload._id,
    content: payload.content,
  });
  return data.message;
});
export const deleteOne = createAsyncThunk('room/deleteOne', async (payload: string) => {
  const response = await messageApi.deleteOne(payload);
  return response.data.message;
});

const messagesAdapter = createEntityAdapter<IMessage>({
  selectId: (message) => message._id,
  sortComparer: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
});

export const messagesSeletor = messagesAdapter.getSelectors((state: RootState) => state.message.messages);

const messagesSlice = createSlice({
  name: 'room',
  initialState: {
    messages: messagesAdapter.getInitialState(),
  },
  reducers: {
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
  },
  extraReducers: (builder) => {
    builder.addCase(getMessageInRoom.pending, (state) => {});
    builder.addCase(getMessageInRoom.rejected, (state) => {});
    builder.addCase(getMessageInRoom.fulfilled, (state, { payload }: PayloadAction<IResultMessages>) => {
      if (payload.seed === 0) messagesAdapter.removeAll(state.messages);
      messagesAdapter.addMany(state.messages, payload.messages);
    });
    builder.addCase(updateOne.pending, (state) => {});
    builder.addCase(updateOne.rejected, (state) => {});
    builder.addCase(updateOne.fulfilled, (state, { payload }: PayloadAction<IMessage>) => {
      messagesAdapter.updateOne(state.messages, { id: payload._id, changes: payload });
    });
    builder.addCase(deleteOne.pending, (state) => {});
    builder.addCase(deleteOne.rejected, (state) => {});
    builder.addCase(deleteOne.fulfilled, (state, { payload }: PayloadAction<IMessage>) => {
      messagesAdapter.removeOne(state.messages, payload._id);
    });
    builder.addCase(createOne.pending, (state) => {});
    builder.addCase(createOne.rejected, (state) => {});
    builder.addCase(createOne.fulfilled, (state, { payload }: PayloadAction<IMessage>) => {
      messagesAdapter.addOne(state.messages, payload);
    });
  },
});
const { actions, reducer: messagesReducer } = messagesSlice;
export const { addNewMessage, removeOneMessage, editOneMessage } = actions;
export default messagesReducer;
