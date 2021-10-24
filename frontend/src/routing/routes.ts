import BadgePage from 'pages/badge/BadgePage';
import EditProfilePage from 'pages/editProfile';
import FriendsPage from 'pages/friends/FriendsPage';
import CategoryPage from '../pages/category';
import ChallengeDetailsPage from '../pages/challenge';
import CompletedChallengesPage from 'pages/completedChallenges/CompletedChallengesPage';
import ExplorePage from '../pages/explore';
import FeedPage from '../pages/feed';
import HomePage from '../pages/home';
import LandingPage from 'pages/landing/LandingPage';
import LoginPage from '../pages/login';
import OnboardingPage from 'pages/onboarding/OnboardingPage';
import ProfilePage from '../pages/profile';
import RegistrationPage from '../pages/registration';
import { DemoMap } from '../pages/maps';
import { RouteEntry } from '../types/routes';

export const HOME_ROUTE = '/';
export const LOGIN_ROUTE = '/login';
export const REGISTER_ROUTE = '/register';
export const EXPLORE_ROUTE = '/explore';
export const FEED_ROUTE = '/feed';
export const PROFILE_ROUTE = '/profile';
export const CATEGORY_ROUTE = '/category';
export const EDIT_PROFILE_ROUTE = '/profile/edit';
export const FRIENDS_ROUTE = '/friends';
export const COMPLETED_CHALLENGES_ROUTE = '/completed';
export const BADGE_ROUTE = '/badges';
export const ONBOARDING_ROUTE = '/welcome';
export const LANDING_ROUTE = '/landing';
// TODO: remove when no longer needed.
export const DEMO_MAP_ROUTE = '/map/demo';

// Routes that are accessible only if user is not authenticated
export const notAuthenticatedRoutes: RouteEntry[] = [
  { path: ONBOARDING_ROUTE, component: OnboardingPage },
  { path: LOGIN_ROUTE, component: LoginPage },
  { path: REGISTER_ROUTE, component: RegistrationPage },
];

// Public routes that are accessible regardless of authentication status
export const publicRoutes: RouteEntry[] = [
  { path: LANDING_ROUTE, component: LandingPage },
];

// Route that appear on the navbar
export const mainRoutes: RouteEntry[] = [
  { path: PROFILE_ROUTE, component: ProfilePage, exact: true },
  { path: HOME_ROUTE, component: HomePage, exact: true },
  { path: FEED_ROUTE, component: FeedPage, exact: true },
  { path: EXPLORE_ROUTE, component: ExplorePage },
];

export const privateRoutes: RouteEntry[] = [
  { path: EDIT_PROFILE_ROUTE, component: EditProfilePage, exact: true },
  { path: PROFILE_ROUTE, component: ProfilePage, exact: true },
  { path: HOME_ROUTE, component: HomePage, exact: true },
  { path: FEED_ROUTE, component: FeedPage, exact: true },
  {
    path: CATEGORY_ROUTE + '/:categoryId/:challengeId',
    component: ChallengeDetailsPage,
  },
  { path: FRIENDS_ROUTE, component: FriendsPage, exact: true },
  {
    path: COMPLETED_CHALLENGES_ROUTE,
    component: CompletedChallengesPage,
    exact: true,
  },
  {
    path: BADGE_ROUTE,
    component: BadgePage,
    exact: true,
  },
  {
    path: CATEGORY_ROUTE + '/:categoryId',
    component: CategoryPage,
    exact: true,
  },
  { path: EXPLORE_ROUTE, component: ExplorePage },
  { path: DEMO_MAP_ROUTE, component: DemoMap },
];
