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
