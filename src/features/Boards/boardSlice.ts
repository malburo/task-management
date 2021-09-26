import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import boardApi from 'api/boardApi';
import columnApi from 'api/columnApi';
import { RootState } from 'app/store';
import { mapOrder } from 'utilities/sorts';
import { IColumn } from './../../models/column';
import { ITask } from './../../models/task';

export const getOneBoard = createAsyncThunk('board/getOneBoard', async (payload: any) => {
  const { data } = await boardApi.getOne(payload);
  const columns = mapOrder(data.columns, data.board.columnOrder, '_id');
  const tasks = columns.reduce((prev: any, curr: any) => [...prev, curr.tasks], []).flat();
  return { board: data.board, columns, tasks, members: data.members };
});

export const updateColumnOrder = createAsyncThunk('board/updateColumnOrder', async (payload: any) => {
  const response = await boardApi.update({
    boardId: payload.boardId,
    data: { columnOrder: payload.newColumnOrder },
  });
  return response;
});

export const updateTaskOrder = createAsyncThunk('board/updateTaskOrder', async (payload: any) => {
  const response = await columnApi.update({
    columnId: payload.columnId,
    data: {
      taskOrder: payload.taskOrder,
      taskId: payload.taskId || null,
    },
  });
  return response;
});

export const columnsAdapter = createEntityAdapter({
  selectId: (column: IColumn) => column._id,
  sortComparer: false,
});
export const tasksAdapter = createEntityAdapter({
  selectId: (task: ITask) => task._id,
});
export const membersAdapter = createEntityAdapter({
  selectId: (column: IColumn) => column._id,
});

const boardSlice = createSlice({
  name: 'board',
  initialState: {
    isPrivate: false,
    columns: columnsAdapter.getInitialState(),
    tasks: tasksAdapter.getInitialState(),
    members: membersAdapter.getInitialState(),
  },
  reducers: {
    addMember: (state: any, { payload }: PayloadAction<any>) => {
      columnsAdapter.addOne(state.members, payload.newMember);
    },
    dropColumn: (state: any, { payload }: PayloadAction<any>) => {
      columnsAdapter.setAll(state.columns, payload.newColumns);
    },
    drogTask: (state: any, { payload }: PayloadAction<any>) => {
      columnsAdapter.updateOne(state.columns, { id: payload.columnId, changes: payload.changes });
      if (payload.taskId) {
        tasksAdapter.updateOne(state.tasks, { id: payload.taskId, changes: { columnId: payload.columnId } });
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOneBoard.pending, (state) => {});
    builder.addCase(getOneBoard.rejected, (state) => {});
    builder.addCase(getOneBoard.fulfilled, (state, { payload }: PayloadAction<any>) => {
      columnsAdapter.setAll(state.columns, payload.columns);
      tasksAdapter.setAll(state.tasks, payload.tasks);
      membersAdapter.setAll(state.members, payload.members);
    });
  },
});

export const columnsSelector = columnsAdapter.getSelectors((state: RootState) => state.board.columns);
export const tasksSelector = tasksAdapter.getSelectors((state: RootState) => state.board.tasks);
export const membersSelector = membersAdapter.getSelectors((state: RootState) => state.board.members);

const { reducer: boardReducer, actions } = boardSlice;
export const { dropColumn, drogTask, addMember } = actions;
export default boardReducer;
