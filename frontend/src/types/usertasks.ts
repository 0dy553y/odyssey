export interface UserTaskListData {
  id: number;
  name: string;
  challengeName: string;
  description: string;
  isCompleted: boolean;
  index: number;
}

export type UserTaskData = UserTaskListData;
