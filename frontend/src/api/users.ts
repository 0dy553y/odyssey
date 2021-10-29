import { ApiPromise } from '../types/api';
import { UserData } from '../types/auth';
import BaseAPI from './base';

export type PseudoUserData = Omit<UserData, 'registrationDate'> & {
  registrationDate: string;
};

export const userDataMapper = (user: PseudoUserData): UserData => {
  return {
    ...user,
    registrationDate: new Date(user.registrationDate),
  };
};

class UsersAPI extends BaseAPI {
  protected static getUsersUrl(): string {
    return 'users';
  }

  public getUserDetails(username?: string): ApiPromise<UserData> {
    return this.get(
      `${UsersAPI.getUsersUrl()}/user_details?username=${username ?? ''}`
    ).then((resp) => {
      const data = userDataMapper(resp.payload.data as PseudoUserData);
      return {
        ...resp,
        payload: {
          data,
        },
      };
    });
  }
}

export default UsersAPI;
