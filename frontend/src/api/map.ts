import BaseAPI from './base';
import { ApiPromise } from '../types/api';
import { UserChallengeMapData } from '../types/userchallenge';

class MapAPI extends BaseAPI {
  protected static getMapUrl(): string {
    return 'map';
  }

  public getAllOngoingChallengeMaps(): ApiPromise<UserChallengeMapData[]> {
    return this.get(`${MapAPI.getMapUrl()}/all_ongoing_user_challenge_maps`);
  }

  public getChallengeMap(
    challengeId: number
  ): ApiPromise<UserChallengeMapData> {
    return this.get(`${MapAPI.getMapUrl()}/${challengeId}`);
  }
}

export default MapAPI;
