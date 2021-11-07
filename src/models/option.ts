import { IUser } from './user';

export default interface IOption {
  _id: string;
  text: string;
  value: number;
  selectedBy?: IUser[];
  userId: string[];
}
