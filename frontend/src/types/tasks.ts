export interface TaskData {
  id: number;
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

export interface TaskPutData extends TaskPostData {
  id: number;
}
