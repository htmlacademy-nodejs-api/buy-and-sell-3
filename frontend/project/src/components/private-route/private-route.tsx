import {Navigate} from 'react-router-dom';
import Loader from '../loader/loader';
import {AppRoute, AuthorizationStatus} from '../../const';
import {isAuthorization, isAuthorizationUnknown} from '../../util';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {authorizationStatus, children} = props;

  if (isAuthorization(authorizationStatus)) {
    return children;
  }

  if (isAuthorizationUnknown(authorizationStatus)) {
    return <Loader />;
  }

  return <Navigate to={AppRoute.Login} />;
}

export default PrivateRoute;
