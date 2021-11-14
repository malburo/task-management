import { IUser } from './user';

export interface IBoard {
  _id: string;
  title: string;
  description: string;
  coverUrl: string;
  isPrivate: boolean;
  columnOrder: string[] | [];
  createdAt: Date;
  updatedAt: Date;
  members: IUser[] | [];
}
