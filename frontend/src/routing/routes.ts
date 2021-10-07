import LoginPage from '../pages/login';
import RegistrationPage from '../pages/registration';

export const LOGIN_ROUTE = '/login';
export const REGISTER_ROUTE = '/register';

export const routes = [
  { path: LOGIN_ROUTE, component: LoginPage, isPublic: true },
  { path: REGISTER_ROUTE, component: RegistrationPage, isPublic: true },
  { path: '/', component: LoginPage }, // TODO: replace this with actual home page
];
