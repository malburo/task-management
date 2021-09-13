import { IColumn } from './column';
import { IUser } from './user';

export interface IBoard {
  id: string;
  isPrivate: boolean;
  title: string;
  description: string;
  coverUrl: string;
  admin?: IUser;
  membersId: IUser[];
  columnOrder: string[] | [];
  columns: IColumn[] | [];
}
