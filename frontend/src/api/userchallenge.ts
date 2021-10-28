import {
  CompletedUserChallengeListData,
  UserChallengeData,
  UserChallengeListData,
} from 'types/userchallenge';
import { ApiPromise } from '../types/api';
import BaseAPI from './base';

class UserChallengesAPI extends BaseAPI {
  protected static getUserChallengesUrl(): string {
    return 'user_challenges';
  }

  public getAllUserChallengesDataForChallenge(
    challengeId: number
  ): ApiPromise<UserChallengeData[]> {
    return this.get(
      `${UserChallengesAPI.getUserChallengesUrl()}/all_user_challenges_for_challenge?challenge_id=${challengeId}`
    );
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
    );
  }
}

export default UserChallengesAPI;
