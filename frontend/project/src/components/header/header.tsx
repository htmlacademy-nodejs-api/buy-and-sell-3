import {useContext} from 'react';
import classNames from 'classnames';
import {Link} from 'react-router-dom';
import {UserContext} from '../../context/user';
import {useAppDispatch} from '../../hooks';
import {logoutUserAction} from '../../store/api-actions';
import {isAuthorization} from '../../util';
import {AppRoute, AuthorizationStatus} from '../../const';

type HeaderProps = {
  authorizationStatus: AuthorizationStatus,
}

function Header(props: HeaderProps): JSX.Element {
  const {authorizationStatus} = props;

  const {user} = useContext(UserContext);

  const dispatch = useAppDispatch();

  const headerClass = classNames(
    'header',
    {
      'header--logged': isAuthorization(authorizationStatus),
    },
  );

  return (
    <header className={headerClass}>
      <div className="header__wrapper">
        <Link
          to={AppRoute.Root}
          className="header__logo logo"
        >
          <img src="/img/logo.svg" width="179" height="34" alt="Логотип Куплю Продам" />
        </Link>
        {isAuthorization(authorizationStatus) && (
          <nav className="header__user-menu">
            <ul className="header__list">
              <li className="header__item">
                <Link
                  to={AppRoute.TicketCreate}
                >
                  Создать объявление
                </Link>
              </li>
            </ul>
          </nav>
        )}
        <Link
          to={AppRoute.Root}
          className="header__avatar avatar"
          onClick={(evt) => {
            evt.preventDefault();
            dispatch(logoutUserAction());
          }}
        >
          <img src={user.avatar} alt="Аватар пользователя" />
        </Link>
        <Link
          to={AppRoute.Login}
          className="header__input"
        >
          Вход и регистрация
        </Link>
      </div>
    </header>
  );
}

export default Header;
