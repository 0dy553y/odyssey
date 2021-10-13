import HomePage from '../pages/home';
import EditProfilePage from 'pages/editProfile';
import LoginPage from '../pages/login';
import ProfilePage from '../pages/profile';
import RegistrationPage from '../pages/registration';
import ChallengeDetailsPage from '../pages/challenge';
import CategoryPage from '../pages/category';
import ExplorePage from '../pages/explore';
import { RouteEntry } from '../types/routes';

export const HOME_ROUTE = '/';
export const LOGIN_ROUTE = '/login';
export const REGISTER_ROUTE = '/register';
export const EXPLORE_ROUTE = '/explore';
export const FEED_ROUTE = '/feed';
export const PROFILE_ROUTE = '/profile';
export const CATEGORY_ROUTE = '/category';
export const EDIT_PROFILE_ROUTE = '/profile/edit';

export const publicRoutes: RouteEntry[] = [
  { path: LOGIN_ROUTE, component: LoginPage },
  { path: REGISTER_ROUTE, component: RegistrationPage },
];

export const privateRoutes: RouteEntry[] = [
  { path: EDIT_PROFILE_ROUTE, component: EditProfilePage, exact: true },
  { path: PROFILE_ROUTE, component: ProfilePage, exact: true },
  { path: HOME_ROUTE, component: HomePage },
  {
    path: CATEGORY_ROUTE + '/:categoryId/:challengeId',
    component: ChallengeDetailsPage,
  },
  { path: CATEGORY_ROUTE + '/:categoryId', component: CategoryPage },
  { path: EXPLORE_ROUTE, component: ExplorePage },
];
