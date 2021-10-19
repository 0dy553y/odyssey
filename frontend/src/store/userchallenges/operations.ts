import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import {
  CompletedUserChallengeListData,
  UserChallengeListData,
} from 'types/userchallenge';
import { UserTaskListData } from 'types/usertasks';
import api from '../../api';
import { OperationResult } from '../../types/store';
import { RootState } from '../index';
import {
  updateCompletedUserChallengesListData,
  updateOngoingUserChallengeData,
  updateOngoingUserChallengesListData,
} from './actions';
import { mapUserTaskDateStringsIntoDateObjects } from '../usertasks/operations';

export function loadOngoingUserChallengeDataForChallenge(
  challengeId: number
): OperationResult {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    const response = await api.userChallenges.getOngoingUserChallengeData(
      challengeId
    );
    const data = response.payload.data;
    if (!data) {
      return;
    }

    const userTasks: UserTaskListData[] = data.userTasks.map(
      mapUserTaskDateStringsIntoDateObjects
    );
    dispatch(
      updateOngoingUserChallengeData({
        challengeId,
        data: {
          ...data,
          enrolledDate: new Date(data.enrolledDate),
          userTasks,
        },
      })
    );
  };
}

export function loadAllOngoingUserChallenges(): OperationResult {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    const response = await api.userChallenges.getAllOngoingUserChallengesData();
    const userChallenges: UserChallengeListData[] = response.payload.data;
    dispatch(
      updateOngoingUserChallengesListData({
        data: [...userChallenges],
      })
    );
  };
}

export function loadAllCompletedUserChallenges(): OperationResult {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    const response =
      await api.userChallenges.getAllCompletedUserChallengesData();
    const userChallenges: CompletedUserChallengeListData[] =
      response.payload.data.map((userChallenge) => {
        return {
          ...userChallenge,
          completedAt: new Date(userChallenge.completedAt),
        };
      });
    dispatch(
      updateCompletedUserChallengesListData({
        data: [...userChallenges],
      })
    );
  };
}
