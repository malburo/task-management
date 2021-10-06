export interface IUser {
  _id: string;
  fullname: string;
  username: string;
  email: string;
  profilePictureUrl: string;
  bio: string;
  createAt: Date;
  updatedAt: Date;
}
