import {
  ChallengeData,
  ChallengeListData,
  ChallengeMapData,
} from '../../types/challenges';
import {
  REMOVE_CHALLENGE,
  RemoveChallengeAction,
  SAVE_CHALLENGE,
  SAVE_CHALLENGE_LIST,
  SAVE_CHALLENGE_MAPS,
  SaveChallengeAction,
  SaveChallengeListAction,
  SaveChallengeMapsAction,
} from './types';

export function saveChallengeList(
  challengeList: ChallengeListData[]
): SaveChallengeListAction {
  return {
    type: SAVE_CHALLENGE_LIST,
    challengeList,
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

export function saveChallengeMaps(
  challengeMaps: ChallengeMapData[]
): SaveChallengeMapsAction {
  return {
    type: SAVE_CHALLENGE_MAPS,
    challengeMaps,
  };
}
