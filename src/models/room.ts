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
  isBot: boolean;
}

export const initialRoom = {
  _id: '',
  board: {} as IBoard,
  newMessage: 0,
  image: 'none',
  isGeneral: false,
  members: [],
  name: 'all',
  isBot: false,
};
