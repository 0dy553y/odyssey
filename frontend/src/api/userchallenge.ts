import { UserChallengeData } from 'types/userchallenge';
import { ApiPromise } from '../types/api';
import BaseAPI from './base';

class UserChallengesAPI extends BaseAPI {
  protected static getUserChallengesUrl(): string {
    return 'user_challenges';
  }

  public getOngoingUserChallengeData(
    challengeId: number
  ): ApiPromise<UserChallengeData> {
    return this.get(
      `${UserChallengesAPI.getUserChallengesUrl()}/ongoing_user_challenge?challenge_id=${challengeId}`
    );
  }
}

export default UserChallengesAPI;
