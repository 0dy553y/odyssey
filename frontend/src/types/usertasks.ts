export interface UserTaskListData {
  id: number;
  name: string;
  challengeName: string;
  description: string;
  isCompleted: boolean; // TODO: remove this
  completedAt: Date;
  index: number;
}

export type UserTaskData = UserTaskListData;
