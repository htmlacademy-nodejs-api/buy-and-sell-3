import {Link, useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {removeTicketAction} from '../../store/api-actions';
import {AppRoute, OfferType, TicketType} from '../../const';
import {getFormatedDate} from '../../util';
import {Ticket} from '../../types/ticket';
import {User} from '../../types/user';

type TicketViewContentType = {
  ticket: Ticket,
  user: User,
}

function TicketViewContent({ticket, user}: TicketViewContentType): JSX.Element {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  return (
    <div className="ticket__content">
      <div className="ticket__img">
        <img
          src={ticket.image}
          alt={`Изображение товара ${ticket.title}`}
        />
      </div>
      <div className="ticket__info">
        <h2 className="ticket__title">
          {ticket.title}
        </h2>
        <div className="ticket__header">
          <p className="ticket__price">
            <span className="js-sum">{ticket.price}</span> ₽
          </p>
          <p className="ticket__action">
            {
              (OfferType.Buy === ticket.type)
                ? TicketType[OfferType.Buy]
                : TicketType[OfferType.Sell]
            }
          </p>
        </div>
        <div className="ticket__desc">
          <p>
            {ticket.description}
          </p>
        </div>
        <div className="ticket__data">
          <p>
            <b>Дата добавления: </b>
            <span>
              {getFormatedDate(ticket.publishedDate)}
            </span>
          </p>
          <p>
            <b>Автор: </b>
            <span>
              {`${ticket.user.name} ${ticket.user.surname}`}
            </span>
          </p>
          <p>
            <b>Контакты: </b>
            <a href={ticket.user.email}>
              {ticket.user.email}
            </a>
          </p>
        </div>
        {
          (ticket.user.email === user.email) &&
            <>
              <button
                className="ticket__edit"
                type="button"
                onClick={() => {
                  navigate(`${AppRoute.TicketEdit}/${ticket.id}`);
                }}
              >
                Редактировать объявление
              </button>
              <button
                className="ticket__remove"
                type="button"
                onClick={() => {
                  dispatch(removeTicketAction((ticket.id) ? ticket.id : ''));
                }}
              >
                Удалить объявление
              </button>
            </>
        }
        <ul className="ticket__tags">
          {
            ticket.categories
              .map((category, index) => {
                const keyValue = `${index}-${category.id}`;
                return (
                  <li key={keyValue}>
                    <Link
                      to={`${AppRoute.Category}/${category.id}`}
                      className="category-tile category-tile--small"
                    >
                      <span className="category-tile__image">
                        <img
                          src={category.image}
                          alt={`Иконка категории ${category.title}`}
                        />
                      </span>
                      <span className="category-tile__label">
                        {category.title}
                      </span>
                    </Link>
                  </li>
                );
              })
          }
        </ul>
      </div>
    </div>
  );
}

export default TicketViewContent;
