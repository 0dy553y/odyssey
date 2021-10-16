import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { UserTaskListData } from 'types/usertasks';
import api from '../../api';
import { OperationResult } from '../../types/store';
import { RootState } from '../index';
import { updateOngoingUserChallengeData } from './actions';

export function loadOngoingUserChallengeDataForChallenge(
  challengeId: number
): OperationResult {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    const response = await api.userChallenges.getOngoingUserChallengeData(
      challengeId
    );
    const userTasks: UserTaskListData[] = response.payload.data.userTasks.map(
      (userTask) => {
        return {
          ...userTask,
          completedAt: userTask.completedAt && new Date(userTask.completedAt),
        };
      }
    );
    dispatch(
      updateOngoingUserChallengeData({
        challengeId,
        data: { ...response.payload.data, userTasks },
      })
    );
  };
}
