type Base64EncodedString = string;
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
  displayName?: string;
  avatar?: string;
}

export interface UserPutData {
  displayName?: string;
  avatar?: Base64EncodedString;
}
