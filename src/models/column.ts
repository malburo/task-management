export interface IColumn {
  _id: string;
  title: string;
  boardId: string;
  taskOrder: string[] | [];
  createdAt: Date;
  updatedAt: Date;
}
