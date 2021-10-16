import { UserChallengeData } from 'types/userchallenge';
import { RootState } from '../index';
import { UserChallengesState } from './types';

function getLocalState(state: RootState): UserChallengesState {
  return state.userChallenges;
}

export function getOngoingUserChallengeData(
  state: RootState,
  categoryId: number
): UserChallengeData | undefined {
  return getLocalState(state).ongoingUserChallengeData[categoryId];
}
