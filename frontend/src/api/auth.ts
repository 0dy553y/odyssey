import { ApiPromise } from '../types/api';
import { LoginData, RegisterData, UserData, UserPutData } from '../types/auth';
import BaseAPI from './base';
import { PseudoUserData, userDataMapper } from './users';

class AuthAPI extends BaseAPI {
  protected static getAuthUrl(): string {
    return 'auth';
  }

  public registerUser(registerData: RegisterData): ApiPromise<void> {
    return this.post(`${AuthAPI.getAuthUrl()}`, registerData);
  }

  public login(signInData: LoginData): ApiPromise<UserData> {
    return this.post(`${AuthAPI.getAuthUrl()}/sign_in`, signInData).then(
      (resp) => {
        const data = userDataMapper(resp.payload.data as PseudoUserData);
        return {
          ...resp,
          payload: {
            data,
          },
        };
      }
    );
  }

  public logout(): ApiPromise<void> {
    return this.delete(`${AuthAPI.getAuthUrl()}/sign_out`);
  }

  public validateToken(): ApiPromise<UserData> {
    return this.get(`${AuthAPI.getAuthUrl()}/validate_token`).then((resp) => {
      const data = userDataMapper(resp.payload.data as PseudoUserData);
      return {
        ...resp,
        payload: {
          data,
        },
      };
    });
  }

  public editUser(userPutData: UserPutData): ApiPromise<UserData> {
    return this.put(`${AuthAPI.getAuthUrl()}`, userPutData).then((resp) => {
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

export default AuthAPI;
