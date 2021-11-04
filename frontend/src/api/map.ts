import BaseAPI from './base';
import { ApiPromise } from '../types/api';
import { ChallengeMapData } from '../types/challenges';

class MapAPI extends BaseAPI {
  protected static getMapUrl(): string {
    return 'map';
  }

  public loadAllOngoingChallengeMaps(): ApiPromise<ChallengeMapData[]> {
    return this.get(`${MapAPI.getMapUrl()}/all_ongoing_challenge_maps`);
  }
}

export default MapAPI;
