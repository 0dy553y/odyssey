import { ChallengeMapData } from 'types/challenges';
import {
  CompletedUserChallengeListData,
  UserChallengeData,
  UserChallengeListData,
} from 'types/userchallenge';
import { RootState } from '../index';
import { UserChallengesState } from './types';

function getLocalState(state: RootState): UserChallengesState {
  return state.userChallenges;
}

export function getOngoingOrCompletedUserChallengeDataForChallenge(
  state: RootState,
  challengeId: number
): UserChallengeData | undefined {
  const userChallenges = getAllUserChallengesDataForChallenge(
    state,
    challengeId
  );

  if (userChallenges.length === 0) {
    return undefined;
  }

  const latest = userChallenges[userChallenges.length - 1];

  if (!!latest.forfeitedAt) {
    return undefined;
  }

  return latest;
}

export function getAllUserChallengesDataForChallenge(
  state: RootState,
  challengeId: number
): UserChallengeData[] {
  return getLocalState(state).allUserChallengesData[challengeId] ?? [];
}

export function getAllOngoingUserChallenges(
  state: RootState
): UserChallengeListData[] {
  return getLocalState(state).ongoingUserChallengesList;
}

export function getAllCompletedUserChallenges(
  state: RootState
): CompletedUserChallengeListData[] {
  return getLocalState(state).completedUserChallengesList;
}

export function getChallengeMaps(state: RootState): ChallengeMapData[] {
  return getLocalState(state).ongoingChallengeMapsList;
}
