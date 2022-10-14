import {useState, ChangeEvent, useEffect, FormEvent} from 'react';
import Select, {MultiValue} from 'react-select';
import classNames from 'classnames';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {editTicketAction, createTicketAction} from '../../store/api-actions';
import {useFormData} from '../../hooks/useFormData';
import {OfferType, TicketType} from '../../const';
import {Ticket, TicketCreate} from '../../types/ticket';
import {FormActionType} from '../../types/form';
import './ticket-form.module.css';

import {getCategories} from '../../store/categories-data/selectors';

type TicketFormProps = {
  ticket?: Ticket
}

type OptionItem = {
  value: string,
  label: string,
}

const initialFormState = {
  title: '',
  description: '',
  image: '',
  imageStatus: false,
  type: '',
  categories: [],
  price: 0,
};

function TicketForm({ticket}: TicketFormProps): JSX.Element {
  const dispatch = useAppDispatch();

  const categories = useAppSelector(getCategories);

  const [image, setImage] = useState<string>('');

  const [type, setType] = useState<OfferType | string | null>(null);

  const {formState, formDispatch} = useFormData<TicketCreate>(initialFormState);

  useEffect(() => {
    if (ticket && ticket.type) {
      setImage(ticket.image);
      setType(ticket.type);
    } else {
      setImage('');
      setType(null);
    }

    if (ticket) {
      formDispatch({
        type: FormActionType.setTitle,
        payload: ticket?.title,
      });
      formDispatch({
        type: FormActionType.setDescription,
        payload: ticket.description,
      });
      formDispatch({
        type: FormActionType.setImage,
        payload: ticket.image,
      });
      formDispatch({
        type: FormActionType.setType,
        payload: ticket.type,
      });
      formDispatch({
        type: FormActionType.setCategories,
        payload: ticket.categories.map((category) => category.id),
      });
      formDispatch({
        type: FormActionType.setPrice,
        payload: ticket.price,
      });
    }
  }, [ticket, formDispatch]);

  const categoryOptions = categories
    .map((categoryItem) => ({
      value: categoryItem.id,
      label: categoryItem.title,
    }));

  const categoryValues = (ticket)
    ? categoryOptions
      .filter((categoryOption) => {
        const categoriesIds = ticket.categories
          .map((categoryItem) => categoryItem.id);
        return categoriesIds.includes(categoryOption.value);
      })
    : [];

  const handleImageUpload = (evt: ChangeEvent<HTMLInputElement>) => {
    if (!evt.target.files) {
      return;
    }

    const file = evt.target.files[0];
    setImage(URL.createObjectURL(file));

    formDispatch({
      type: FormActionType.setImageStatus,
      payload: true,
    });
    formDispatch({
      type: FormActionType.setImage,
      payload: file,
    });
  };

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    (ticket)
      ? dispatch(
        editTicketAction({
          ...formState,
          id: ticket.id,
          publishedDate: ticket.publishedDate,
          commentsCount: ticket.commentsCount,
        }),
      )
      : dispatch(
        createTicketAction(formState),
      );
  };

  const imageUploadClass = classNames(
    'ticket-form__avatar-container',
    'js-preview-container',
    {
      'uploaded': !!(ticket) || image,
    },
  );

  return (
    <form
      className="ticket-form__form form"
      action="#"
      method="post"
      encType="multipart/form-data"
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <div
        className={imageUploadClass}
      >
        <div className="ticket-form__avatar js-preview">
          {(ticket || image) && (
            <img
              src={image}
              alt={`Фотография ${ticket?.title}`}
            />
          )}
        </div>
        <div className="ticket-form__field-avatar">
          <input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/png, image/jpeg"
            className="visually-hidden"
            onChange={handleImageUpload}
          />
          <label htmlFor="avatar">
            <span className="ticket-form__text-upload">Загрузить фото…</span>
            <span className="ticket-form__text-another">Загрузить другое фото…</span>
          </label>
        </div>
      </div>
      <div className="ticket-form__content">
        <div className="ticket-form__row">
          <div className="form__field">
            <input
              type="text"
              name="ticket-name"
              id="ticket-name"
              placeholder="Название"
              defaultValue={(ticket) ? ticket.title : ''}
              required
              onChange={(evt) =>
                formDispatch({
                  type: FormActionType.setTitle,
                  payload: evt.target.value,
                })}
            />
          </div>
        </div>
        <div className="ticket-form__row">
          <div className="form__field">
            <textarea
              name="comment"
              id="comment-field"
              cols={30}
              rows={10}
              placeholder="Описание"
              defaultValue={(ticket) ? ticket.description : ''}
              onChange={(evt) =>
                formDispatch({
                  type: FormActionType.setDescription,
                  payload: evt.target.value,
                })}
            >
            </textarea>
          </div>
        </div>
        <div className="ticket-form__row">
          <Select
            key={categoryValues.reduce((acc: string, currentValue) => `${acc}-${currentValue.value}`, '')}
            name="category"
            className="basic-multi-select"
            isMulti
            classNamePrefix="select"
            defaultValue={categoryValues}
            options={categoryOptions}
            onChange={
              (selections: MultiValue<OptionItem>) =>
                formDispatch({
                  type: FormActionType.setCategories,
                  payload: selections.map(
                    (selection) => {
                      const categoryItem = categories.find((category) =>
                        category.title === selection.label);

                      return (categoryItem) ? categoryItem.id : '';
                    },
                  ),
                })
            }
          />
        </div>
        <div className="ticket-form__row">
          <div className="form__field form__field--price">
            <input
              type="number"
              name="price"
              id="price-field"
              min="1"
              placeholder="Цена"
              defaultValue={(ticket) ? ticket.price : ''}
              required
              onChange={(evt) =>
                formDispatch({
                  type: FormActionType.setPrice,
                  payload: Number(evt.target.value),
                })}
            />
          </div>
          <div className="form__switch switch">
            <div className="switch__item">
              <input
                type="radio"
                id="buy-field"
                name="action"
                defaultValue={OfferType.Buy}
                checked={(type === OfferType.Buy)}
                onChange={(evt) => {
                  setType(OfferType.Buy);
                  formDispatch({
                    type: FormActionType.setType,
                    payload: evt.target.value,
                  });
                }}
                className="visually-hidden"
              />
              <label htmlFor="buy-field" className="switch__button">
                {TicketType.Buy}
              </label>
            </div>
            <div className="switch__item">
              <input
                type="radio"
                id="sell-field"
                name="action"
                defaultValue={OfferType.Sell}
                checked={(type === OfferType.Sell)}
                onChange={(evt) => {
                  setType(OfferType.Sell);
                  formDispatch({
                    type: FormActionType.setType,
                    payload: evt.target.value,
                  });
                }}
                className="visually-hidden"
              />
              <label htmlFor="sell-field" className="switch__button">
                {TicketType.Sell}
              </label>
            </div>
          </div>
        </div>
      </div>
      <button
        className="form__button btn btn--medium js-button"
        type="submit"
      >
        {
          (ticket) ? 'Сохранить' : 'Опубликовать'
        }
      </button>
    </form>
  );
}

export default TicketForm;
