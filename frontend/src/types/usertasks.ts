import { ChallengeColor } from './challenges';

export interface UserTaskListData {
  id: number;
  name: string;
  challengeName: string;
  prizeName: string;
  scheduledFor: Date;
  description: string;
  completedAt?: Date;
  taskIndex: number;
  taskId: number;
  challengeColor: ChallengeColor;
  challengeId: number;
  isChallengeCompleted: boolean;
}

export type UserTaskData = UserTaskListData;

export type UserTaskActivityDatum = { date: Date; count: number };
