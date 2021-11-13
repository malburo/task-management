export interface ITask {
  _id: string;
  title: string;
  description: string;
  coverUrl: string;
  columnId: string;
  membersId: string[];
  labelsId: string[];
  deadlineDay: Date;
  reminderDay: Date;
  createdAt: Date;
  updatedAt: Date;
}
