import { UserChallengeData } from 'types/userchallenge';
import { RootState } from '../index';
import { UserChallengesState } from './types';

function getLocalState(state: RootState): UserChallengesState {
  return state.userChallenges;
}

export function getUserChallengeData(
  state: RootState,
  categoryId: number
): UserChallengeData | undefined {
  return getLocalState(state).latestUserChallengeData[categoryId];
}
