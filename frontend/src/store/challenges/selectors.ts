import { RootState } from '../index';
import { ChallengesState } from './types';
import {
  ChallengeData,
  ChallengeListData,
  ChallengeMapData,
} from '../../types/challenges';

function getLocalState(state: RootState): ChallengesState {
  return state.challenges;
}

export function getChallengeList(state: RootState): ChallengeListData[] {
  return getLocalState(state).challengeList;
}

export function getChallenge(
  state: RootState,
  challengeId: number
): ChallengeData {
  return getLocalState(state).challenges[challengeId];
}

export function getChallengeMaps(state: RootState): ChallengeMapData[] {
  return getLocalState(state).challengeMaps;
}
