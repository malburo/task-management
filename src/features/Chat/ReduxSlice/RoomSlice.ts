import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import roomApi from 'api/roomApi';
import { IBoard } from 'models/board';
import { IRoom } from 'models/room';

export const getOneRoom = createAsyncThunk('room/getOneRoom', async (payload: string) => {
  const { data } = await roomApi.getOne(payload);
  return data.room;
});

export const getGeneralRoom = createAsyncThunk('room/getGeneralRoom', async (payload: string) => {
  const response = await roomApi.getGeneralRoom(payload);
  return response.data.room;
});

interface IRoomState {
  roomInfor: IRoom;
}
const initialState: IRoomState = {
  roomInfor: { _id: '', board: {} as IBoard, newMessage: 0, image: '', isGeneral: false, members: [], name: '' },
};

const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOneRoom.pending, (state) => {});
    builder.addCase(getOneRoom.rejected, (state) => {});
    builder.addCase(getOneRoom.fulfilled, (state, { payload }: PayloadAction<IRoom>) => {
      state.roomInfor._id = payload._id;
      state.roomInfor.board = payload.board;
      state.roomInfor.isGeneral = payload.isGeneral;
      state.roomInfor.members = payload.members;
      state.roomInfor.name = payload.name;
    });
    builder.addCase(getGeneralRoom.pending, (state) => {});
    builder.addCase(getGeneralRoom.rejected, (state) => {});
    builder.addCase(getGeneralRoom.fulfilled, (state, { payload }: PayloadAction<IRoom>) => {
      state.roomInfor._id = payload._id;
      state.roomInfor.board = payload.board;
      state.roomInfor.isGeneral = payload.isGeneral;
      state.roomInfor.members = payload.members;
      state.roomInfor.name = payload.name;
    });
  },
});
// eslint-disable-next-line
const { actions, reducer: roomReducer } = roomSlice;
export default roomReducer;
