import { ApiPromise } from '../types/api';
import { RegisterData, SignInData, UserData } from '../types/auth';
import BaseAPI from './base';

class AuthAPI extends BaseAPI {
  protected static getAuthUrl(): string {
    return 'auth';
  }

  // TODO: check return values
  public registerUser(registerData: RegisterData): ApiPromise<void> {
    return this.post(`${AuthAPI.getAuthUrl()}`, registerData);
  }

  public signIn(signInData: SignInData): ApiPromise<UserData> {
    return this.post(`${AuthAPI.getAuthUrl()}/sign_in`, signInData);
  }
}

export default AuthAPI;
