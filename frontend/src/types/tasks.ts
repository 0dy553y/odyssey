export interface TaskListData {
  id: number;
  challengeId: number;
  name: string;
  description: string;
  index: number;
}

export type TaskData = TaskListData;

export interface TaskPostData {
  challengeId: number;
  name: string;
  description: string;
  index: number;
}

export interface TaskPutData extends TaskPostData {
  id: number;
}
