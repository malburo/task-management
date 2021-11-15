import { IUser } from 'models/user';
export interface IConmment {
  _id: string;
  content: string;
  taskId: string;
  userId: string;
  member: IUser;
  createdAt: Date;
  updatedAt: Date;
}
