export interface ChallengeListData {
  id: number;
  name: string;
  duration: number;
}

export interface ChallengeData extends ChallengeListData {
  description: string;
  schedule: string;
  tasks: TaskData[];
}

export interface ChallengePostData {
  name: string;
  description: string;
  categoryId: number;
  duration: number;
  schedule: string;
}

export interface ChallengePutData {
  id: number;
}

export interface TaskData {
  description: string;
}
