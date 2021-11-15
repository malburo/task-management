import { IUser } from 'models/user';

export interface IActivity {
  _id: string;
  content: any;
  sender: IUser;
  boardId: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}
