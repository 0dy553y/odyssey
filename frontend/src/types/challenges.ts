import { DayOfWeek } from './date';

export interface ChallengeListData {
  id: number;
  name: string;
  duration: number;
  categoryId: number;
}

export interface ChallengeData extends ChallengeListData {
  description: string;
  schedule: string;
  createdBy: string;
  color: ChallengeColor;
  categoryId: number;
  originalCreator?: string;
  referenceLink?: string;
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
  BLUE,
  PURPLE,
  NAVY,
  ORANGE,
  PINK,
  GREEN,
}

export enum ChallengeStatus {
  ONGOING,
  COMPLETED,
  FORFEITED,
}

export type Schedule = Record<DayOfWeek, boolean>;
