import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import roomApi from 'api/roomApi';
import { IBoard } from 'models/board';
import { IRoom } from 'models/room';

export const getOneRoom = createAsyncThunk('room/getOneRoom', async (payload: any) => {
  const { data } = await roomApi.getOne(payload.id);
  return { room: data.room };
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
    builder.addCase(getOneRoom.fulfilled, (state, { payload }: PayloadAction<any>) => {
      state.roomInfor._id = payload.room._id;
      state.roomInfor.board = payload.room.board;
      state.roomInfor.isGeneral = payload.room.isGeneral;
      state.roomInfor.members = payload.room.members;
      state.roomInfor.name = payload.room.name;
    });
  },
});
// eslint-disable-next-line
const { actions, reducer: roomReducer } = roomSlice;
export default roomReducer;
