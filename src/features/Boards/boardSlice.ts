import { createAsyncThunk, createEntityAdapter, createSlice, EntityState, PayloadAction } from '@reduxjs/toolkit';
import boardApi from 'api/boardApi';
import { RootState } from 'app/store';
import { IColumn } from 'models/column';
import { ITask } from 'models/task';
import { IUser } from 'models/user';

export const getOneBoard = createAsyncThunk('board/getOneBoard', async (payload: { boardId: string }) => {
  const { data } = await boardApi.getOne(payload);
  const { board, columns, members } = data as any;
  const tasks = columns.reduce((prev: any, curr: any) => [...prev, curr.tasks], []).flat();
  delete columns.tasks;
  return { board, columns, tasks, members };
});

export const columnsAdapter = createEntityAdapter({
  selectId: (column: IColumn) => column._id,
});
export const tasksAdapter = createEntityAdapter({
  selectId: (task: ITask) => task._id,
});
export const membersAdapter = createEntityAdapter({
  selectId: (member: IUser) => member._id,
});

interface BoardState {
  isPrivate: boolean;
  columnOrder: string[];
  createdAt: string;
  updatedAt: string;
  columns: EntityState<IColumn>;
  tasks: EntityState<ITask>;
  members: EntityState<IUser>;
}

const initialState: BoardState = {
  isPrivate: false,
  columnOrder: [],
  createdAt: '',
  updatedAt: '',
  columns: columnsAdapter.getInitialState(),
  tasks: tasksAdapter.getInitialState(),
  members: membersAdapter.getInitialState(),
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    updateBoard: (state, { payload }: PayloadAction<any>) => {
      return (state = { ...state, ...payload.changes });
    },
    addColumn: (state, { payload }: PayloadAction<any>) => {
      columnsAdapter.addOne(state.columns, payload.newColumn);
    },
    updateColumn: (state, { payload }: PayloadAction<any>) => {
      columnsAdapter.updateOne(state.columns, { id: payload.columnId, changes: payload.changes });
    },
    addTask: (state, { payload }: PayloadAction<any>) => {
      tasksAdapter.addOne(state.tasks, payload.newTask);
    },
    updateTask: (state, { payload }: PayloadAction<any>) => {
      tasksAdapter.updateOne(state.tasks, { id: payload.taskId, changes: payload.changes });
    },
    addMember: (state, { payload }: PayloadAction<any>) => {
      membersAdapter.addOne(state.members, payload.newMember);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOneBoard.fulfilled, (state, { payload }: PayloadAction<any>) => {
      state.isPrivate = payload.board.isPrivate;
      state.columnOrder = payload.board.columnOrder;
      state.createdAt = payload.board.createdAt;
      state.updatedAt = payload.board.updatedAt;
      columnsAdapter.setAll(state.columns, payload.columns);
      membersAdapter.setAll(state.members, payload.members);
      tasksAdapter.setAll(state.tasks, payload.tasks);
    });
  },
});

export const columnsSelector = columnsAdapter.getSelectors((state: RootState) => state.board.columns);
export const tasksSelector = tasksAdapter.getSelectors((state: RootState) => state.board.tasks);
export const membersSelector = membersAdapter.getSelectors((state: RootState) => state.board.members);

const { reducer: boardReducer, actions } = boardSlice;
export const { updateBoard, addTask, addColumn, updateColumn, updateTask, addMember } = actions;
export default boardReducer;
