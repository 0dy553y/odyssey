import DemoMap from 'components/map/mapTemplates/DemoMap';
import EditProfilePage from 'pages/editProfile';
import FriendsPage from 'pages/friends/FriendsPage';
import LandingPage from 'pages/landing/LandingPage';
import MementosPage from 'pages/memento/MementosPage';
import OnboardingPage from 'pages/onboarding/OnboardingPage';
import PostsPage from 'pages/posts/PostsPage';
import CategoryPage from '../pages/category';
import ChallengeDetailsPage from '../pages/challenge';
import ExplorePage from '../pages/explore';
import FeedPage from '../pages/feed';
import AddFriendsPage from '../pages/friends/AddFriendsPage';
import HomePage from '../pages/home';
import LoginPage from '../pages/login';
import { CompletedMapPage, OngoingMapPage } from '../pages/maps';
import NotificationsPage from '../pages/notifications/NotificationsPage';
import ProfilePage from '../pages/profile';
import RegistrationPage from '../pages/registration';
import { RouteEntry } from '../types/routes';

export const HOME_ROUTE = '/';
export const LOGIN_ROUTE = '/login';
export const REGISTER_ROUTE = '/register';
export const EXPLORE_ROUTE = '/explore';
export const FEED_ROUTE = '/feed';
export const PROFILE_ROUTE = '/profile';
export const CATEGORY_ROUTE = '/category';
export const EDIT_PROFILE_ROUTE = '/edit-profile';
export const FRIENDS_ROUTE = '/friends';
export const ADD_FRIENDS_ROUTE = '/add-friends';
export const NOTIFICATIONS_ROUTE = '/notifications';
export const MEMENTOS_ROUTE = '/mementos';
export const POSTS_ROUTE = '/posts';
export const ONBOARDING_ROUTE = '/welcome';
export const CHALLENGE_ROUTE = '/challenge';
export const LANDING_ROUTE = '/landing';
// TODO: remove when no longer needed.
export const DEMO_MAP_ROUTE = '/map/demo';
export const MAP_ROUTE = '/map';
export const COMPLETED_MAP_ROUTE = '/map/completed';

// Routes that are accessible only if user is not authenticated
export const notAuthenticatedRoutes: RouteEntry[] = [
  { path: ONBOARDING_ROUTE, component: OnboardingPage },
  { path: LOGIN_ROUTE, component: LoginPage },
  { path: REGISTER_ROUTE, component: RegistrationPage },
  { path: LANDING_ROUTE, component: LandingPage },
];

// Public routes that are accessible regardless of authentication status
export const publicRoutes: RouteEntry[] = [];

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
  { path: PROFILE_ROUTE + '/:username', component: ProfilePage, exact: true },
  { path: HOME_ROUTE, component: HomePage, exact: true },
  { path: FEED_ROUTE, component: FeedPage, exact: true },
  {
    path: CHALLENGE_ROUTE + '/:challengeId',
    component: ChallengeDetailsPage,
  },
  { path: ADD_FRIENDS_ROUTE, component: AddFriendsPage, exact: true },
  { path: FRIENDS_ROUTE, component: FriendsPage, exact: true },
  { path: FRIENDS_ROUTE + '/:username', component: FriendsPage, exact: true },
  { path: NOTIFICATIONS_ROUTE, component: NotificationsPage, exact: true },
  {
    path: MEMENTOS_ROUTE,
    component: MementosPage,
    exact: true,
  },
  {
    path: MEMENTOS_ROUTE + '/:username',
    component: MementosPage,
    exact: true,
  },
  {
    path: POSTS_ROUTE,
    component: PostsPage,
    exact: true,
  },
  {
    path: POSTS_ROUTE + '/:username',
    component: PostsPage,
    exact: true,
  },
  {
    path: CATEGORY_ROUTE + '/:categoryId',
    component: CategoryPage,
    exact: true,
  },
  { path: EXPLORE_ROUTE, component: ExplorePage },
  { path: DEMO_MAP_ROUTE, component: DemoMap },
  {
    path: MAP_ROUTE + '/:challengeId',
    component: OngoingMapPage,
    exact: true,
  },
  {
    path: COMPLETED_MAP_ROUTE + '/:challengeId',
    component: CompletedMapPage,
  },
];
