import { Dayjs } from 'dayjs';

export interface ChallengeListData {
  id: number;
  name: string;
  duration: number;
}

export interface ChallengeData extends ChallengeListData {
  description: string;
  schedule: string;
  tasks: TaskData[];
  color: ChallengeColor;
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

export enum ChallengeColor {
  BLUE = '#3836A6',
  PURPLE = '#9F88E3',
}

export interface TaskData {
  id: number;
  title: string;
  description: string;
  dayNumber: number;
}

export interface UserChallenge {
  id: number;
  user_id: number;
  challenge_id: number;
  status: ChallengeStatus;
  enrolled_at: Dayjs;
  reason_for_enrollment: string;
}

export enum ChallengeStatus {
  ONGOING,
  COMPLETED,
  FORFEITED,
}
