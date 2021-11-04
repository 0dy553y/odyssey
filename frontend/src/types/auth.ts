// https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs

import { Character } from './map';

// data:[<mediatype>][;base64],<data>
export type DataUrl = string;

export interface LoginData {
  username: string;
  password: string;
}
export interface RegisterData extends LoginData {
  displayName?: string;
  passwordConfirmation: string;
}

export interface UserData {
  id: number;
  username: string;
  displayName?: string;
  avatar?: DataUrl;
  character?: Character;
  registrationDate: Date;
}

export interface UserPutData {
  displayName?: string;
  avatar?: DataUrl;
  character?: Character;
}
