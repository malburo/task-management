export interface IColumn {
  _id: string;
  title: string;
  boardId: string;
  taskOrder: string[] | [];
  createAt: Date;
  updatedAt: Date;
}
