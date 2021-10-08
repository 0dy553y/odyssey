export interface TaskData {
  id: string;
  name: string;
  description: string;
  index: number;
}

export interface TaskPostData {
  name: string;
  challengeId: number;
  description: string;
  index: number;
}

export interface TaskPutData {
  id: number;
}