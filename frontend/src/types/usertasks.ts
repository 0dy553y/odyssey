export interface UserTaskListData {
  id: number;
  name: string;
  challengeName: string;
  description: string;
  isCompleted: boolean;
}

export type UserTaskData = UserTaskListData;
