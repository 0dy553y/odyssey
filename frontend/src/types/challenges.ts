export interface ChallengeListData {
  id: number;
  name: string;
  duration: number;
}

export interface ChallengeData extends ChallengeListData {
  description: string;
  schedule: string;
  createdBy: string;
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

export enum ChallengeStatus {
  ONGOING,
  COMPLETED,
  FORFEITED,
}
