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

export function getChallengeMap(
  state: RootState,
  challengeId: number
): ChallengeMapData | undefined {
  return getLocalState(state).challengeMaps.find(
    (map: ChallengeMapData) => map.challengeId === challengeId
  );
}
