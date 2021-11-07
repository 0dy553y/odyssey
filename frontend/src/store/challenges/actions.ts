import { ChallengeData, ChallengeListData } from '../../types/challenges';
import {
  REMOVE_CHALLENGE,
  RemoveChallengeAction,
  SAVE_CHALLENGE,
  SAVE_CHALLENGE_LIST,
  SAVE_POPULAR_CHALLENGE_LIST,
  SaveChallengeAction,
  SaveChallengeListAction,
  SavePopularChallengeListAction,
} from './types';

export function saveChallengeList(
  challengeList: ChallengeListData[]
): SaveChallengeListAction {
  return {
    type: SAVE_CHALLENGE_LIST,
    challengeList,
  };
}

export function savePopularChallengeList(
  popularChallengeList: ChallengeListData[]
): SavePopularChallengeListAction {
  return {
    type: SAVE_POPULAR_CHALLENGE_LIST,
    popularChallengeList,
  };
}

export function saveChallenge(challenge: ChallengeData): SaveChallengeAction {
  return {
    type: SAVE_CHALLENGE,
    challenge,
  };
}

export function removeChallenge(challengeId: number): RemoveChallengeAction {
  return {
    type: REMOVE_CHALLENGE,
    challengeId,
  };
}
