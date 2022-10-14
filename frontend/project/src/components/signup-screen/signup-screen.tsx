import {ChangeEvent, FormEvent, useRef, useState} from 'react';
import {Link, Navigate} from 'react-router-dom';
import classNames from 'classnames';
import {useFormData} from '../../hooks/useFormData';
import {useAppDispatch} from '../../hooks';
import {registrationUserAction} from '../../store/api-actions';
import {isAuthorization} from '../../util';
import {AppRoute, AuthorizationStatus} from '../../const';
import {FormActionType} from '../../types/form';
import {Signup} from '../../types/user';
import './signup-screen.css';

type SignupScreenProps = {
  authorizationStatus: AuthorizationStatus
}

const initialFormState = {
  name: '',
  surname: '',
  email: '',
  avatar: '',
  password: '',
};

function SignupScreen({authorizationStatus}: SignupScreenProps): JSX.Element {
  const signupFormRef = useRef<HTMLFormElement>(null);

  const dispatch = useAppDispatch();

  const [image, setImage] = useState<File | null>(null);

  const {formState, formDispatch} = useFormData<Signup>(initialFormState);

  if (isAuthorization(authorizationStatus)) {
    return <Navigate to={AppRoute.Root} />;
  }

  const handleImageUpload = (evt: ChangeEvent<HTMLInputElement>) => {
    if (!evt.target.files) {
      return;
    }

    const file = evt.target.files[0];
    setImage(file);

    formDispatch({
      type: FormActionType.setAvatar,
      payload: evt.target.files[0],
    });
  };

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    dispatch(registrationUserAction(formState));
    setImage(null);
  };

  const imageUploadClass = classNames(
    'sign-up__avatar-container',
    'js-preview-container',
    {
      'uploaded': image,
    },
  );

  return (
    <main className="page-content">
      <section className="sign-up">
        <form
          className="sign-up__form form"
          action="#"
          method="post"
          encType="multipart/form-data"
          autoComplete="off"
          ref={signupFormRef}
          onSubmit={handleSubmit}
        >
          <div className="sign-up__title">
            <h2>Регистрация</h2>
            <Link
              to={AppRoute.Login}
              className="sign-up__link"
            >
              Вход
            </Link>
          </div>
          <div
            className={imageUploadClass}
          >
            <div className="sign-up__avatar js-preview">
              {(image) && (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Фотография объявления"
                />
              )}
            </div>
            <div className="sign-up__field-avatar">
              <input
                type="file"
                id="avatar"
                name="avatar"
                className="visually-hidden js-file-field"
                onChange={handleImageUpload}
              />
              <label htmlFor="avatar">
                <span className="sign-up__text-upload">Загрузить аватар…</span>
                <span className="sign-up__text-another">Загрузить другой аватар…</span>
              </label>
            </div>
          </div>
          <div className="form__field sign-up__field">
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Имя"
              required
              onChange={(evt) =>
                formDispatch({
                  type: FormActionType.setName,
                  payload: evt.target.value,
                })}
            />
            <label
              htmlFor="name"
              className="visually-hidden"
            >
              Имя
            </label>
          </div>
          <div className="form__field sign-up__field">
            <input
              type="text"
              name="surname"
              id="surname"
              placeholder="Фамилия"
              required
              onChange={(evt) =>
                formDispatch({
                  type: FormActionType.setSurname,
                  payload: evt.target.value,
                })}
            />
            <label
              htmlFor="surname"
              className="visually-hidden"
            >
              Фамилия
            </label>
          </div>
          <div className="form__field sign-up__field">
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
          <div className="form__field sign-up__field">
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
              htmlFor="user-password"
              className="visually-hidden"
            >
              Пароль
            </label>
          </div>
          <button
            className="sign-up__button btn btn--medium"
            type="submit"
          >
            Создать аккаунт
          </button>
        </form>
      </section>
    </main>
  );
}

export default SignupScreen;
