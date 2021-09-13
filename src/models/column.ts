import { ITask } from './task';

export interface IColumn {
  _id: string;
  title: string;
  boardId: string;
  taskOrder: string[] | [];
  tasks: ITask[] | [];
}
