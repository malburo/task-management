import { IUser } from './user';

export interface ITask {
  _id: string;
  content: string;
  coverUrl: string;
  columnId: string;
  members?: IUser;
}
