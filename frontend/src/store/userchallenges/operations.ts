import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import {
  CompletedUserChallengeListData,
  UserChallengeData,
  UserChallengeListData,
} from 'types/userchallenge';
import { UserTaskListData } from 'types/usertasks';
import api from '../../api';
import { OperationResult } from '../../types/store';
import { RootState } from '../index';
import { mapUserTaskDateStringsIntoDateObjects } from '../usertasks/operations';
import {
  removeOngoingUserChallengeData,
  updateAllUserChallengesData,
  updateCompletedUserChallengesListData,
  updateOngoingUserChallengeData,
  updateOngoingUserChallengesListData,
} from './actions';

export function loadOngoingUserChallengeDataForChallenge(
  challengeId: number
): OperationResult {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    const response = await api.userChallenges.getOngoingUserChallengeData(
      challengeId
    );
    const data = response.payload.data;

    if (!data) {
      dispatch(removeOngoingUserChallengeData({ challengeId }));
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

export function loadAllUserChallengesDataForChallenge(
  challengeId: number
): OperationResult {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    const response =
      await api.userChallenges.getAllUserChallengesDataForChallenge(
        challengeId
      );
    const data = response.payload.data;

    const userChallenges: UserChallengeData[] = data.map((userChallenge) => {
      return {
        ...userChallenge,
        enrolledDate: new Date(userChallenge.enrolledDate),
        completedAt:
          userChallenge.completedAt && new Date(userChallenge.completedAt),
        userTasks: userChallenge.userTasks.map(
          mapUserTaskDateStringsIntoDateObjects
        ),
      };
    });

    dispatch(
      updateAllUserChallengesData({
        challengeId,
        data: userChallenges,
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
