import HomePage from '../pages/home';
import LoginPage from '../pages/login';
import ProfilePage from '../pages/profile';
import RegistrationPage from '../pages/registration';
import { RouteEntry } from '../types/routes';

export const HOME_ROUTE = '/';
export const LOGIN_ROUTE = '/login';
export const REGISTER_ROUTE = '/register';
export const EXPLORE_ROUTE = '/explore';
export const FEED_ROUTE = '/feed';
export const PROFILE_ROUTE = '/profile';

export const publicRoutes: RouteEntry[] = [
  { path: LOGIN_ROUTE, component: LoginPage },
  { path: REGISTER_ROUTE, component: RegistrationPage },
];

export const privateRoutes: RouteEntry[] = [
  { path: PROFILE_ROUTE, component: ProfilePage },
  { path: HOME_ROUTE, component: HomePage },
];
