import {FormEvent, useRef} from 'react';
import {Link, Navigate} from 'react-router-dom';
import {useAppDispatch} from '../../hooks';
import {loginUserAction} from '../../store/api-actions';
import {useFormData} from '../../hooks/useFormData';
import {AppRoute, AuthorizationStatus} from '../../const';
import {isAuthorization} from '../../util';
import {FormActionType} from '../../types/form';
import {Auth} from '../../types/user';

type AuthScreenProps = {
  authorizationStatus: AuthorizationStatus
}

const initialFormState = {
  email: '',
  password: '',
};

function AuthScreen({authorizationStatus}: AuthScreenProps): JSX.Element {
  const authFormRef = useRef<HTMLFormElement>(null);

  const {formState, formDispatch} = useFormData<Auth>(initialFormState);

  const dispatch = useAppDispatch();

  if (isAuthorization(authorizationStatus)) {
    return <Navigate to={AppRoute.Root} />;
  }

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    dispatch(loginUserAction(formState));
  };

  return (
    <main className="page-content">
      <section className="login">
        <form
          className="login__form form"
          action="#"
          method="post"
          encType="multipart/form-data"
          ref={authFormRef}
          onSubmit={handleSubmit}
        >
          <div className="login__title">
            <Link
              to={AppRoute.Signup}
              className="login__link"
            >
              Регистрация
            </Link>
            <h2>Вход</h2>
          </div>
          <div className="form__field login__field">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Эл. почта"
              required
              onChange={(evt) =>
                formDispatch({
                  type: FormActionType.setEmail,
                  payload: evt.target.value,
                })}
            />
            <label
              htmlFor="email"
              className="visually-hidden"
            >
              Эл. почта
            </label>
          </div>
          <div className="form__field login__field">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Пароль"
              required
              onChange={(evt) =>
                formDispatch({
                  type: FormActionType.setPassword,
                  payload: evt.target.value,
                })}
            />
            <label
              htmlFor="password"
              className="visually-hidden"
            >
              Пароль
            </label>
          </div>
          <button
            className="login__button btn btn--medium"
            type="submit"
          >
            Войти
          </button>
        </form>
      </section>
    </main>
  );
}

export default AuthScreen;
