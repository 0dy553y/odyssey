import HomePage from '../pages/home';
import LoginPage from '../pages/login';
import RegistrationPage from '../pages/registration';

export const HOME_ROUTE = '/';
export const LOGIN_ROUTE = '/login';
export const REGISTER_ROUTE = '/register';

export const routes = [
  { path: LOGIN_ROUTE, component: LoginPage, isPublic: true },
  { path: REGISTER_ROUTE, component: RegistrationPage, isPublic: true },
  { path: HOME_ROUTE, component: HomePage },
];
