import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import roomApi from 'api/roomApi';
import { RootState } from 'app/store';
import { IBoard } from 'models/board';
import { IRoom } from 'models/room';

export const getOneRoom = createAsyncThunk('room/getOneRoom', async (payload: any) => {
  const { data } = await roomApi.getOne(payload.id);
  return { room: data.room };
});

const initialState: IRoom = {
  _id: '',
  board: {} as IBoard,
  image: '',
  isGeneral: false,
  members: [],
  name: '',
};

const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOneRoom.pending, (state) => {});
    builder.addCase(getOneRoom.rejected, (state) => {});
    builder.addCase(getOneRoom.fulfilled, (state, { payload }: PayloadAction<any>) => {
      state._id = payload.room._id;
      state.board = payload.room.board;
      state.isGeneral = payload.room.isGeneral;
      state.members = payload.room.members;
      state.name = payload.room.name;
    });
  },
});

const { actions, reducer: roomReducer } = roomSlice;
export default roomReducer;
