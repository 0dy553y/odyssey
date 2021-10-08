import HomePage from '../pages/home';
import EditProfilePage from 'pages/editProfile';
import LoginPage from '../pages/login';
import ProfilePage from '../pages/profile';
import RegistrationPage from '../pages/registration';
import ChallengeDetailsPage from '../pages/challenge';

export const HOME_ROUTE = '/';
export const LOGIN_ROUTE = '/login';
export const REGISTER_ROUTE = '/register';
export const CHALLENGE_ROUTE = '/challenge';

export const routes = [
  { path: LOGIN_ROUTE, component: LoginPage, isPublic: true },
  { path: REGISTER_ROUTE, component: RegistrationPage, isPublic: true },
  { path: CHALLENGE_ROUTE, component: ChallengeDetailsPage },
  { path: HOME_ROUTE, component: HomePage },
];
