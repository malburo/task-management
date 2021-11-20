import { IUser } from './user';

export interface IMember {
  role: string;
  createdAt: string;
  userId: string;
  boardId: string;
  member: IUser;
}
