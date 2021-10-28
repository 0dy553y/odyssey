import BaseAPI from './base';
import { ApiPromise } from '../types/api';
import { UserData } from '../types/auth';

class UsersAPI extends BaseAPI {
  protected static getUsersUrl(): string {
    return 'users';
  }

  public getUserDetails(userId?: number | string): ApiPromise<UserData> {
    return this.get(
      `${UsersAPI.getUsersUrl()}/user_details?userId=${userId ?? ''}`
    );
  }
}

export default UsersAPI;
