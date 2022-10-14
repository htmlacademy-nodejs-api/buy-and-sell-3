import {useEffect, useContext} from 'react';
import {Routes, Route} from 'react-router-dom';
import {useAppSelector} from '../../hooks';
import {useUserData} from '../../hooks/useUserData';

import Layout from '../layout/layout';
import MainScreen from '../main-screen/main-screen';
import CategoryScreen from '../category-screen/category-screen';
import AuthScreen from '../auth-screen/auth-screen';
import SignupScreen from '../signup-screen/signup-screen';
import TicketViewScreen from '../ticket-view-screen/ticket-view-screen';
import TicketScreen from '../ticket-screen/ticket-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/private-route';
import Loader from '../loader/loader';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';
import {AppRoute} from '../../const';

import {UserContext} from '../../context/user';

import {getCategoriesStatus} from '../../store/categories-data/selectors';
import {getAuthorizationStatus} from '../../store/user-data/selectors';
import {getTicketsStatus} from '../../store/tickets-data/selectors';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const isCategoryLoaded = useAppSelector(getCategoriesStatus);
  const isTicketsLoaded = useAppSelector(getTicketsStatus);

  const {updateUser} = useContext(UserContext);

  const user = useUserData(authorizationStatus);

  useEffect(() => {
    updateUser(user);
  }, [user, updateUser]);

  if (isCategoryLoaded || isTicketsLoaded) {
    return (
      <Loader />
    );
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={
            <Layout
              authorizationStatus={authorizationStatus}
            />
          }
        >
          <Route
            index
            element={<MainScreen />}
          />
          <Route
            path={`${AppRoute.Category}/:categoryId`}
            element={<CategoryScreen />}
          />
          <Route
            path={`${AppRoute.Ticket}/:ticketId`}
            element={<TicketViewScreen />}
          />
          <Route
            path={AppRoute.TicketCreate}
            element={
              <PrivateRoute
                authorizationStatus={authorizationStatus}
              >
                <TicketScreen />
              </PrivateRoute>
            }
          />
          <Route
            path={`${AppRoute.TicketEdit}/:ticketId`}
            element={
              <PrivateRoute
                authorizationStatus={authorizationStatus}
              >
                <TicketScreen />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Login}
            element={
              <AuthScreen
                authorizationStatus={authorizationStatus}
              />
            }
          />
          <Route
            path={AppRoute.Signup}
            element={
              <SignupScreen
                authorizationStatus={authorizationStatus}
              />
            }
          />
          <Route
            path="*"
            element={<NotFoundScreen />}
          />
        </Route>
      </Routes>
    </HistoryRouter>
  );
}

export default App;
