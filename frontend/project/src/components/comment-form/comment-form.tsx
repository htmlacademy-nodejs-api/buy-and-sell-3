import {FormEvent} from 'react';
import {useAppDispatch} from '../../hooks';
import {useFormData} from '../../hooks/useFormData';
import {createCommentAction} from '../../store/api-actions';
import {CommentPost} from '../../types/comment';
import {FormActionType} from '../../types/form';
import {User} from '../../types/user';

type CommentFormProps = {
  user: User,
  ticketId: string,
}

const initialFormState = {
  text: '',
  ticketId: '',
};

function CommentForm({user, ticketId}: CommentFormProps): JSX.Element {
  const {formState, formDispatch} = useFormData<CommentPost>(initialFormState);

  const dispatch = useAppDispatch();

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    dispatch(createCommentAction(formState));
  };

  return (
    <form
      action="#"
      method="post"
      className="form comment-form"
      onSubmit={handleSubmit}
    >
      <div className="comment-form__header">
        <div className="comment-form__avatar avatar--no-hover">
          <img
            src={user.avatar}
            alt={`Аватар пользователя ${user.name} ${user.surname}`}
          />
        </div>
        <p className="comment-form__author">Вам слово</p>
      </div>
      <div className="comment-form__field">
        <div className="form__field">
          <textarea
            name="comment"
            id="comment-field"
            cols={30}
            rows={10}
            placeholder="Текст комментария"
            onChange={(evt) => {
              formDispatch({
                type: FormActionType.setCommentText,
                payload: evt.target.value,
              });
              formDispatch({
                type: FormActionType.setTicketId,
                payload: ticketId,
              });
            }}
          >
          </textarea>
        </div>
      </div>
      <button
        className="comment-form__button btn btn--white js-button"
        type="submit"
      >
        Отправить
      </button>
    </form>
  );
}

export default CommentForm;
