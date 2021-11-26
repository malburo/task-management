export interface ITask {
  _id: string;
  title: string;
  description: string;
  coverUrl: string;
  columnId: string;
  status: string;
  membersId: string[];
  labelsId: string[];
  deadlineDay: Date;
  reminderDay: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
