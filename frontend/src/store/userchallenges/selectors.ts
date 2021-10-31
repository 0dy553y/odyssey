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

export function getLatestUserChallengeDataForChallenge(
  state: RootState,
  challengeId: number
): UserChallengeData | undefined {
  const userChallenges = getAllUserChallengesDataForChallenge(
    state,
    challengeId
  );

  return userChallenges.length === 0
    ? undefined
    : userChallenges[userChallenges.length - 1];
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
