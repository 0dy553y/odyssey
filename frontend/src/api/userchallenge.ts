import {
  CompletedUserChallengeListData,
  UserChallengeData,
  UserChallengeListData,
} from 'types/userchallenge';
import { ApiPromise } from '../types/api';
import BaseAPI from './base';
import { PseudoUserTaskListData, userTaskListDataMapper } from './usertasks';

type PseudoUserChallengeData = Omit<
  UserChallengeData,
  'enrolledDate' | 'completedAt' | 'userTasks'
> & {
  enrolledDate: string;
  completedAt?: string;
  userTasks: PseudoUserTaskListData[];
};

type PseudoCompletedUserChallengeListData = Omit<
  CompletedUserChallengeListData,
  'completedAt'
> & {
  completedAt: string;
};

const userChallengeDataMapper = (
  userChallenge: PseudoUserChallengeData
): UserChallengeData => {
  return {
    ...userChallenge,
    userTasks: userChallenge.userTasks.map(userTaskListDataMapper),
    enrolledDate: new Date(userChallenge.enrolledDate),
    completedAt: userChallenge.completedAt
      ? new Date(userChallenge.completedAt)
      : undefined,
  };
};

const completedUserChallengeListDataMapper = (
  userChallengeListData: PseudoCompletedUserChallengeListData
): CompletedUserChallengeListData => {
  return {
    ...userChallengeListData,
    completedAt: new Date(userChallengeListData.completedAt),
  };
};

class UserChallengesAPI extends BaseAPI {
  protected static getUserChallengesUrl(): string {
    return 'user_challenges';
  }

  public getAllUserChallengesDataForChallenge(
    challengeId: number
  ): ApiPromise<UserChallengeData[]> {
    return this.get(
      `${UserChallengesAPI.getUserChallengesUrl()}/all_user_challenges_for_challenge?challenge_id=${challengeId}`
    ).then((resp) => {
      const data = (resp.payload.data as PseudoUserChallengeData[]).map(
        userChallengeDataMapper
      );
      return {
        ...resp,
        payload: {
          data,
        },
      };
    });
  }

  public getAllOngoingUserChallengesData(
    username?: string
  ): ApiPromise<UserChallengeListData[]> {
    return this.get(
      `${UserChallengesAPI.getUserChallengesUrl()}/all_ongoing_challenges?username=${
        username ?? ''
      }`
    );
  }

  public getAllCompletedUserChallengesData(
    username?: string
  ): ApiPromise<CompletedUserChallengeListData[]> {
    return this.get(
      `${UserChallengesAPI.getUserChallengesUrl()}/all_completed_challenges?username=${
        username ?? ''
      }`
    ).then((resp) => {
      const data = (
        resp.payload.data as PseudoCompletedUserChallengeListData[]
      ).map(completedUserChallengeListDataMapper);
      return {
        ...resp,
        payload: {
          data,
        },
      };
    });
  }
}

export default UserChallengesAPI;
