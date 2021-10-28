import BaseAPI from './base';
import { ApiPromise, EmptyPayload } from '../types/api';
import { ChallengeMapData } from '../types/challenges';

class MapAPI extends BaseAPI {
  protected static getMapUrl(): string {
    return 'map';
  }

  public getFriendsOnSameChallenges(): ApiPromise<ChallengeMapData[]> {
    return this.get(`${MapAPI.getMapUrl()}/friends_on_same_challenges`);
  }
}

export default MapAPI;
