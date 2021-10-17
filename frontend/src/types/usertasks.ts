import { ChallengeColor } from './challenges';

export interface UserTaskListData {
  id: number;
  name: string;
  challengeName: string;
  description: string;
  completedAt?: Date;
  taskIndex: number;
  challengeColor: ChallengeColor;
}

export type UserTaskData = UserTaskListData;

export type UserTaskActivityDatum = { date: Date; count: number };
