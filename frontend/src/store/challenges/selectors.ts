import { RootState } from '../index';
import { ChallengesState } from './types';
import { ChallengeData, ChallengeListData } from '../../types/challenges';

function getLocalState(state: RootState): ChallengesState {
  return state.challenges;
}

export function getChallengeList(state: RootState): ChallengeListData[] {
  return getLocalState(state).challengeList;
}

export function getPopularChallengeList(state: RootState): ChallengeListData[] {
  return getLocalState(state).popularChallengeList;
}

export function getChallenge(
  state: RootState,
  challengeId: number
): ChallengeData {
  return getLocalState(state).challenges[challengeId];
}
