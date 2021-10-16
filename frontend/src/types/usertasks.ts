export interface UserTaskListData {
  id: number;
  name: string;
  challengeName: string;
  description: string;
  completedAt: Date;
  index: number;
}

export type UserTaskData = UserTaskListData;
