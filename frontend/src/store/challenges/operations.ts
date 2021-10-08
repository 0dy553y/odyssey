import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../index';
import { AnyAction } from 'redux';
import api from '../../api';
import { ChallengeListData } from '../../types/challenges';
import { saveChallengeList } from './actions';

export function loadAllChallenges() {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    const response = await api.challenges.getChallengeList();
    const challengeListData: ChallengeListData[] = response.payload.data;
    dispatch(saveChallengeList(challengeListData));
  };
}
