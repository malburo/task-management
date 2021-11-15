import { IUser } from './user';

export interface INotification {
  _id: string;
  content: any;
  boardId: string;
  receiverId: string;
  senderId: IUser;
  isRead: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}
