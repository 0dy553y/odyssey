export interface UserTaskListData {
  id: number;
  name: string;
  challengeName: string;
  scheduledFor: Date;
  description: string;
  completedAt?: Date;
  taskIndex: number;
}

export type UserTaskData = UserTaskListData;

export type UserTaskActivityDatum = { date: Date; count: number };
