// https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
// data:[<mediatype>][;base64],<data>
export type DataUrl = string;

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
  avatar?: DataUrl;
}

export interface UserPutData {
  displayName?: string;
  avatar?: DataUrl;
}
