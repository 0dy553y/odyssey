import {
  ChallengeData,
  ChallengeListData,
  ChallengeMapData,
} from '../../types/challenges';

// Action names
export const SAVE_CHALLENGE_LIST = 'challenges/SAVE_CHALLENGE_LIST';
export const SAVE_CHALLENGE = 'challenges/SAVE_CHALLENGE';
export const REMOVE_CHALLENGE = 'challenges/REMOVE_CHALLENGE';
export const SAVE_CHALLENGE_MAPS = 'challenges/SAVE_CHALLENGE_MAPS';

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

export interface SaveChallengeMapsAction {
  type: typeof SAVE_CHALLENGE_MAPS;
  challengeMaps: ChallengeMapData[];
}

export type ChallengeActions =
  | SaveChallengeListAction
  | SaveChallengeAction
  | RemoveChallengeAction
  | SaveChallengeMapsAction;

export interface ChallengesState {
  challengeList: ChallengeListData[];
  challenges: Record<number, ChallengeData>;
  challengeMaps: ChallengeMapData[];
}
