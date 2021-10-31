import { UserData } from '../../types/auth';

export interface AuthState {
  user?: UserData;
  isValidatingToken: boolean;
  redirectUrl: string | null;
}
