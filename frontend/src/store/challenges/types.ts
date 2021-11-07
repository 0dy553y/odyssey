import { ChallengeData, ChallengeListData } from '../../types/challenges';

// Action names
export const SAVE_CHALLENGE_LIST = 'challenges/SAVE_CHALLENGE_LIST';
export const SAVE_POPULAR_CHALLENGE_LIST =
  'challenges/SAVE_POPULAR_CHALLENGE_LIST';
export const SAVE_CHALLENGE = 'challenges/SAVE_CHALLENGE';
export const REMOVE_CHALLENGE = 'challenges/REMOVE_CHALLENGE';
export const SAVE_CHALLENGE_MAPS = 'challenges/SAVE_CHALLENGE_MAPS';

// Action types
export interface SaveChallengeListAction {
  type: typeof SAVE_CHALLENGE_LIST;
  challengeList: ChallengeListData[];
}

export interface SavePopularChallengeListAction {
  type: typeof SAVE_POPULAR_CHALLENGE_LIST;
  popularChallengeList: ChallengeListData[];
}

export interface SaveChallengeAction {
  type: typeof SAVE_CHALLENGE;
  challenge: ChallengeData;
}

export interface RemoveChallengeAction {
  type: typeof REMOVE_CHALLENGE;
  challengeId: number;
}

export type ChallengeActions =
  | SaveChallengeListAction
  | SavePopularChallengeListAction
  | SaveChallengeAction
  | RemoveChallengeAction;

export interface ChallengesState {
  challengeList: ChallengeListData[];
  popularChallengeList: ChallengeListData[];
  challenges: Record<number, ChallengeData>;
}
