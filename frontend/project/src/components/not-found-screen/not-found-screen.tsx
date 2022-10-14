import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';

function NotFoundScreen(): JSX.Element {
  return (
    <main className="page-content">
      <div className="message">
        <div className="message__text">
          <h2>404. Страница не найдена</h2>
        </div>
        <Link
          to={AppRoute.Root}
          className="message__link btn btn--big"
        >
          Вернуться на главную
        </Link>
      </div>
    </main>
  );
}

export default NotFoundScreen;
