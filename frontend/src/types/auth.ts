export interface LoginData {
  username: string;
  password: string;
}
export interface RegisterData extends LoginData {
  passwordConfirmation: string;
}

export interface UserData {
  id: string;
  username: string;
  displayName: string;
}
