import { createAsyncThunk, createEntityAdapter, createSlice, EntityState, PayloadAction } from '@reduxjs/toolkit';
import boardApi from 'api/boardApi';
import { RootState } from 'app/store';
import { IColumn } from 'models/column';
import { ILabel } from 'models/label';
import { ITask } from 'models/task';
import { IUser } from 'models/user';

export const getOneBoard = createAsyncThunk('board/getOneBoard', async (payload: { boardId: string }) => {
  const { data } = await boardApi.getOne(payload);
  const { board, columns, members, labels } = data as any;
  const tasks = columns.reduce((prev: any, curr: any) => [...prev, curr.tasks], []).flat();
  delete columns.tasks;
  return { board, columns, tasks, members, labels };
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
export const labelsAdapter = createEntityAdapter({
  selectId: (label: ILabel) => label._id,
});

interface BoardState {
  isPrivate: boolean;
  columnOrder: string[];
  createdAt: string;
  updatedAt: string;
  columns: EntityState<IColumn>;
  tasks: EntityState<ITask>;
  members: EntityState<IUser>;
  labels: EntityState<ILabel>;
}

const initialState: BoardState = {
  isPrivate: false,
  columnOrder: [],
  createdAt: '',
  updatedAt: '',
  columns: columnsAdapter.getInitialState(),
  tasks: tasksAdapter.getInitialState(),
  members: membersAdapter.getInitialState(),
  labels: labelsAdapter.getInitialState(),
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
    deleteColumn: (state, { payload }: PayloadAction<any>) => {
      columnsAdapter.removeOne(state.columns, payload.columnId);
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

    addLabel: (state, { payload }: PayloadAction<any>) => {
      labelsAdapter.addOne(state.labels, payload.newLabel);
    },
    updateLabel: (state, { payload }: PayloadAction<any>) => {
      labelsAdapter.updateOne(state.labels, { id: payload.labelId, changes: payload.changes });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOneBoard.fulfilled, (state, { payload }: PayloadAction<any>) => {
      if (!payload.board) return;
      state.isPrivate = payload.board.isPrivate;
      state.columnOrder = payload.board.columnOrder;
      state.createdAt = payload.board.createdAt;
      state.updatedAt = payload.board.updatedAt;
      columnsAdapter.setAll(state.columns, payload.columns);
      membersAdapter.setAll(state.members, payload.members);
      tasksAdapter.setAll(state.tasks, payload.tasks);
      labelsAdapter.setAll(state.labels, payload.labels);
    });
  },
});

export const columnsSelector = columnsAdapter.getSelectors((state: RootState) => state.board.columns);
export const tasksSelector = tasksAdapter.getSelectors((state: RootState) => state.board.tasks);
export const membersSelector = membersAdapter.getSelectors((state: RootState) => state.board.members);
export const labelsSelector = labelsAdapter.getSelectors((state: RootState) => state.board.labels);

const { reducer: boardReducer, actions } = boardSlice;
export const {
  updateBoard,
  addColumn,
  updateColumn,
  deleteColumn,
  addTask,
  updateTask,
  addMember,
  addLabel,
  updateLabel,
} = actions;

export default boardReducer;
