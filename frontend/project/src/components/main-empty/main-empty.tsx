import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';

function MainEmpty(): JSX.Element {
  return (
    <div className="message">
      <div className="message__text">
        <p>На сайте еще не опубликовано ни одного объявления.</p>
      </div>
      <Link
        to={AppRoute.Login}
        className="message__link btn btn--big"
      >
        Вход
      </Link>
    </div>
  );
}

export default MainEmpty;
