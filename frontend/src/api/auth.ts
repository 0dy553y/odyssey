import { ApiPromise } from '../types/api';
import { LoginData, RegisterData, UserData } from '../types/auth';
import BaseAPI from './base';

class AuthAPI extends BaseAPI {
  protected static getAuthUrl(): string {
    return 'auth';
  }

  public registerUser(registerData: RegisterData): ApiPromise<void> {
    return this.post(`${AuthAPI.getAuthUrl()}`, registerData);
  }

  public login(signInData: LoginData): ApiPromise<UserData> {
    return this.post(`${AuthAPI.getAuthUrl()}/sign_in`, signInData);
  }
}

export default AuthAPI;
