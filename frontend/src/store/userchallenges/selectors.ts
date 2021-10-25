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

export function getOngoingUserChallengeData(
  state: RootState,
  challengeId: number
): UserChallengeData | undefined {
  return getLocalState(state).ongoingUserChallengeData[challengeId];
}

export function getAllUserChallengesDataForChallenge(
  state: RootState,
  challengeId: number
): UserChallengeData[] | undefined {
  return getLocalState(state).allUserChallengesData[challengeId];
}

export function getAllOngoingUserChallenges(
  state: RootState
): UserChallengeListData[] | undefined {
  return getLocalState(state).ongoingUserChallengesList;
}

export function getAllCompletedUserChallenges(
  state: RootState
): CompletedUserChallengeListData[] | undefined {
  return getLocalState(state).completedUserChallengesList;
}
