import HomePage from '../pages/home';
import LoginPage from '../pages/login';
import RegistrationPage from '../pages/registration';
import CategoryPage from '../pages/category';
import ExplorePage from '../pages/explore';

export const HOME_ROUTE = '/';
export const LOGIN_ROUTE = '/login';
export const REGISTER_ROUTE = '/register';
export const EXPLORE_ROUTE = '/explore';
export const CATEGORY_ROUTE = '/category';

export const routes = [
  { path: LOGIN_ROUTE, component: LoginPage, isPublic: true },
  { path: REGISTER_ROUTE, component: RegistrationPage, isPublic: true },
  { path: EXPLORE_ROUTE, component: ExplorePage, isPublic: true },
  { path: CATEGORY_ROUTE, component: CategoryPage, isPublic: true },
  { path: HOME_ROUTE, component: HomePage, isPublic: true },
];
