import HomePage from '../pages/home';
import LoginPage from '../pages/login';
import ProfilePage from '../pages/profile';
import RegistrationPage from '../pages/registration';

export const HOME_ROUTE = '/';
export const LOGIN_ROUTE = '/login';
export const REGISTER_ROUTE = '/register';
export const PROFILE_ROUTE = '/profile';

export const routes = [
  { path: LOGIN_ROUTE, component: LoginPage, isPublic: true },
  { path: REGISTER_ROUTE, component: RegistrationPage, isPublic: true },
  { path: PROFILE_ROUTE, component: ProfilePage },
  { path: HOME_ROUTE, component: HomePage },
];
