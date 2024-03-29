export interface IUser {
  _id: string;
  fullname: string;
  username: string;
  email: string;
  profilePictureUrl: string;
  bio: string;
  role?: string;
  createdAt: Date;
  updatedAt: Date;
}
