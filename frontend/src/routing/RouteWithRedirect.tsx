import React from 'react';
import {
  RouteProps,
  Route,
  Redirect,
  RouteComponentProps,
} from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { resetRedirectUrl, setRedirectUrl } from '../store/auth/actions';
import { RootState } from '../store';
import { Dispatch } from 'redux';

export type RouteWithRedirectProps = {
  shouldRedirect: boolean;
  redirectPath: string;
  shouldStoreRedirectUrl: boolean;
} & RouteProps;

const RouteWithRedirect = ({
  shouldRedirect,
  redirectPath,
  shouldStoreRedirectUrl,
  component: Component,
  redirectUrl,
  setRedirectUrl,
  resetRedirectUrl,
  ...routeProps
}: RouteWithRedirectProps & PropsFromRedux): JSX.Element => {
  if (!Component) {
    throw Error('Component is undefined');
  }

  const render = (props: RouteComponentProps): React.ReactNode => {
    if (shouldRedirect) {
      if (shouldStoreRedirectUrl) {
        setRedirectUrl(props.location.pathname);
      } else {
        resetRedirectUrl();
      }
      return <Redirect to={{ pathname: redirectUrl ?? redirectPath }} />;
    }
    return <Component {...props} />;
  };

  return <Route {...routeProps} render={render} />;
};

const mapStateToProps = (state: RootState) => {
  return {
    redirectUrl: state.auth.redirectUrl,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setRedirectUrl: (redirectUrl: string) =>
      dispatch(setRedirectUrl(redirectUrl)),
    resetRedirectUrl: () => dispatch(resetRedirectUrl()),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(RouteWithRedirect);
