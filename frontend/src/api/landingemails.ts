import { ApiPromise } from '../types/api';
import { LandingEmailPostData } from '../types/landingemails';
import BaseAPI from './base';

class LandingEmailsAPI extends BaseAPI {
  protected static getLandingEmailsUrl(): string {
    return 'landing_emails';
  }

  public registerEmail(
    landingEmailData: LandingEmailPostData
  ): ApiPromise<void> {
    return this.post(
      `${LandingEmailsAPI.getLandingEmailsUrl()}`,
      landingEmailData
    );
  }
}

export default LandingEmailsAPI;
