import { IUser } from './user';

export default interface IOption {
  _id: string;
  text: String;
  value: number;
  selectedBy?: IUser[];
  userId: string[];
}
