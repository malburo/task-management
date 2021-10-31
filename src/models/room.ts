import { IBoard } from './board';
import { IUser } from './user';

export interface IRoom {
  _id: string;
  isGeneral: boolean;
  name: string;
  members: IUser[] | [];
  board: IBoard;
  image?: string;
  newMessage: number;
}
