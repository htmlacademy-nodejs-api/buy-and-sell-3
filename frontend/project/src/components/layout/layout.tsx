import {Fragment} from 'react';
import {Outlet} from 'react-router-dom';
import Header from '../header/header';
import Footer from '../footer/footer';
import {AuthorizationStatus} from '../../const';

type LayoutProps = {
  authorizationStatus: AuthorizationStatus,
};

function Layout(props: LayoutProps): JSX.Element {
  const {authorizationStatus} = props;

  return (
    <Fragment>
      <Header
        authorizationStatus={authorizationStatus}
      />
      <Outlet />
      <Footer />
    </Fragment>
  );
}

export default Layout;
