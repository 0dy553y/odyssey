export interface RegisterData {
  username: string;
  password: string;
  passwordConfirmation: string;
}

export interface UserData {
  id: string;
  username: string;
  displayName: string;
}

export interface SignInData {
  username: string;
  password: string;
}
