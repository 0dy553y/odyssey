import { ChallengeData, ChallengeListData } from '../../types/challenges';

// Action names
export const SAVE_CHALLENGE_LIST = 'challenges/SAVE_CHALLENGE_LIST';
export const SAVE_CHALLENGE = 'challenges/SAVE_CHALLENGE';
export const REMOVE_CHALLENGE = 'challenges/REMOVE_CHALLENGE';

// Action types
export interface SaveChallengeListAction {
  type: typeof SAVE_CHALLENGE_LIST;
  challengeList: ChallengeListData[];
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
  | SaveChallengeAction
  | RemoveChallengeAction;

export interface ChallengesState {
  challenges: (ChallengeListData & Partial<ChallengeData>)[];
}
