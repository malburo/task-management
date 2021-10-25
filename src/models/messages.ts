import ISelectFormMessage from './selectMessage';
import { IUser } from './user';

export interface IMessage {
  _id: string;
  content: string;
  createdAt: Date;
  postedBy: IUser;
  type: Number;
  form?: ISelectFormMessage;
}
