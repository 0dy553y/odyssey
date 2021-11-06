import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { UserChallengeMapData } from 'types/userchallenge';
import {
  CompletedUserChallengeListData,
  UserChallengeListData,
} from 'types/userchallenge';
import api from '../../api';
import { OperationResult } from '../../types/store';
import { RootState } from '../index';
import {
  updateAllUserChallengesData,
  updateCompletedUserChallengesListData,
  updateOngoingChallengeMapsData,
  updateOngoingUserChallengesListData,
  updateChallengeMapData,
} from './actions';

export function loadAllUserChallengesDataForChallenge(
  challengeId: number
): OperationResult {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    const response =
      await api.userChallenges.getAllUserChallengesDataForChallenge(
        challengeId
      );
    const data = response.payload.data;

    dispatch(
      updateAllUserChallengesData({
        challengeId,
        data,
      })
    );
  };
}

export function loadAllOngoingUserChallenges(
  username?: string
): OperationResult {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    const response = await api.userChallenges.getAllOngoingUserChallengesData(
      username
    );
    const userChallenges: UserChallengeListData[] = response.payload.data;
    dispatch(
      updateOngoingUserChallengesListData({
        data: [...userChallenges],
      })
    );
  };
}

export function loadAllCompletedUserChallenges(
  username?: string
): OperationResult {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    const response = await api.userChallenges.getAllCompletedUserChallengesData(
      username
    );
    const userChallenges: CompletedUserChallengeListData[] =
      response.payload.data;
    dispatch(
      updateCompletedUserChallengesListData({
        data: [...userChallenges],
      })
    );
  };
}

export function loadAllOngoingChallengeMaps(): OperationResult {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    const response = await api.map.getAllOngoingChallengeMaps();
    const challengeMaps: UserChallengeMapData[] = response.payload.data;
    dispatch(updateOngoingChallengeMapsData({ data: [...challengeMaps] }));
  };
}

export function loadChallengeMap(challengeId: number): OperationResult {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    const response = await api.map.getChallengeMap(challengeId);
    const challengeMap: UserChallengeMapData = response.payload.data;
    dispatch(updateChallengeMapData({ data: challengeMap }));
  };
}

export function forfeitUserChallenge(
  userChallengeId: number,
  challengeId: number
): OperationResult {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    await api.userChallenges.forfeitUserChallenge(userChallengeId);
    dispatch(loadAllUserChallengesDataForChallenge(challengeId));
  };
}
