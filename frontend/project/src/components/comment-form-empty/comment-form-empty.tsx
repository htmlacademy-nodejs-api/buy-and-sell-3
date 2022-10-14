import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';

function CommentFormEmpty(): JSX.Element {
  return (
    <div className="ticket__warning">
      <p>Отправка комментариев доступна только для зарегистрированных пользователей.</p>
      <Link
        to={AppRoute.Signup}
        className="btn btn--big"
      >
        Вход и регистрация
      </Link>
    </div>
  );
}

export default CommentFormEmpty;
