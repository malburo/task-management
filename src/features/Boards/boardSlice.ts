import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import boardApi from 'api/boardApi';
import columnApi from 'api/columnApi';
import { RootState } from 'app/store';
import { IBoard } from 'models/board';
import { Response } from 'models/common';
import { applyDrag } from 'utilities/dragDrop';
import { mapOrder } from 'utilities/sorts';
import { IColumn } from './../../models/column';

interface IinitalState {
  data: IBoard | null;
}

const initialState: IinitalState = {
  data: null,
};

export const getOneBoard = createAsyncThunk('board/getOneBoard', async (payload: any, thunkAPI) => {
  const response = await boardApi.getOne(payload);
  return response;
});
export const updateBoard = createAsyncThunk<Promise<Response<IBoard>>, any, { state: RootState }>(
  'board/update',
  async (payload: any, thunkAPI) => {
    await thunkAPI.dispatch(updateBoardRedux({ dropResult: payload.dropResult }));
    const { board } = thunkAPI.getState();
    const newPayload = {
      boardId: payload.boardId,
      data: board.data,
    };
    const response = await boardApi.update(newPayload);
    return response;
  }
);
export const updateColumn = createAsyncThunk<any, any, { state: RootState }>(
  'board/update',
  async (payload: any, thunkAPI) => {
    await thunkAPI.dispatch(updateColumnRedux({ columnId: payload.columnId, dropResult: payload.dropResult }));
    const { board } = thunkAPI.getState();
    if (!board.data || !board.data.columns) return;
    const currentColumn = board.data.columns.find((column) => column._id === payload.columnId)!;
    let newPayload = {
      columnId: payload.columnId,
      taskOrder: currentColumn.taskOrder,
      taskId: payload.taskId || null,
    };
    const response = await columnApi.update(newPayload);
    return response;
  }
);
const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    updateBoardRedux: (state: IinitalState, action: PayloadAction<any>) => {
      if (!state.data) return;
      const newColumns = applyDrag(state.data.columns, action.payload.dropResult);
      state.data.columnOrder = newColumns.map((column: IColumn) => column._id);
      state.data.columns = newColumns;
    },
    updateColumnRedux: (state: IinitalState, action: PayloadAction<any>) => {
      if (!state.data) return;
      let currentColumn = state.data?.columns?.find((column) => column._id === action.payload.columnId)!;
      currentColumn.tasks = applyDrag(currentColumn.tasks, action.payload.dropResult);
      currentColumn.taskOrder = currentColumn.tasks.map((task) => task._id);
    },
    updateTasksRedux: (state: IinitalState, action: PayloadAction<any>) => {
      if (!state.data) return;
      let currentColumn = state.data?.columns?.find((column) => column._id === action.payload.columnId)!;
      currentColumn.tasks = mapOrder(currentColumn.tasks, currentColumn.taskOrder, '_id');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOneBoard.pending, (state) => {});
    builder.addCase(getOneBoard.rejected, (state) => {});
    builder.addCase(getOneBoard.fulfilled, (state, action: PayloadAction<Response<IBoard>>) => {
      action.payload.data.board.columns = mapOrder(
        action.payload.data.board.columns,
        action.payload.data.board.columnOrder,
        '_id'
      );
      state.data = action.payload.data.board;
    });
  },
});

const { reducer: boardReducer, actions } = boardSlice;
export const { updateBoardRedux, updateColumnRedux, updateTasksRedux } = actions;
export default boardReducer;
