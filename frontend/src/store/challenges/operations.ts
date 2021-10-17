import { batch } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { loadOngoingUserChallengeDataForChallenge } from 'store/userchallenges/operations';
import { withStatusMessages } from 'utils/ui';
import api from '../../api';
import {
  ChallengeData,
  ChallengeListData,
  ChallengePostData,
  ChallengePutData,
  Schedule,
} from '../../types/challenges';
import { OperationResult } from '../../types/store';
import { RootState } from '../index';
import { removeChallenge, saveChallenge, saveChallengeList } from './actions';

export function loadAllChallenges(): OperationResult {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    const response = await api.challenges.getChallengeList();
    const challenges: ChallengeListData[] = response.payload.data;
    dispatch(saveChallengeList(challenges));
  };
}

export function loadChallenge(challengeId: number): OperationResult {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    const response = await api.challenges.getChallenge(challengeId);
    const challenge: ChallengeData = response.payload.data;
    dispatch(saveChallenge(challenge));
  };
}

export function joinChallenge(
  challengeId: number,
  recurringDays: Schedule
): OperationResult {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    await withStatusMessages(
      dispatch,
      api.challenges.joinChallenge(challengeId, recurringDays)
    ).then(() => {
      dispatch(loadOngoingUserChallengeDataForChallenge(challengeId));
    });
  };
}

export function createChallenge(
  challengePostData: ChallengePostData
): OperationResult {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    const response = await api.challenges.addChallenge(challengePostData);
    const challenge: ChallengeData = response.payload.data;
    dispatch(saveChallenge(challenge));
  };
}

export function updateChallenge(
  challengePutData: ChallengePutData
): OperationResult {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    const response = await api.challenges.editChallenge(challengePutData);
    const challenge: ChallengeData = response.payload.data;
    batch(() => {
      dispatch(removeChallenge(challenge.id));
      dispatch(saveChallenge(challenge));
    });
  };
}

export function deleteChallenge(challengeId: number): OperationResult {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    await api.challenges.deleteChallenge(challengeId);
    dispatch(removeChallenge(challengeId));
  };
}
