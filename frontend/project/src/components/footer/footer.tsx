import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';

function Footer(): JSX.Element {
  return (
    <footer className="page-footer">
      <div className="page-footer__wrapper">
        <div className="page-footer__col">
          <Link
            to={AppRoute.Root}
            className="page-footer__logo logo"
          >
            <img src="/img/logo.svg" width="179" height="35" alt="Логотип Куплю Продам" />
          </Link>
          <a href="https://htmlacademy.ru" className="page-footer__logo-academy" aria-label="Ссылка на сайт HTML-Академии">
            <img src="/img/logo-htmlac.svg" alt="Логотип HTML-Академии" />
          </a>
          <p className="page-footer__copyright">© 2019 Проект Академии</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
