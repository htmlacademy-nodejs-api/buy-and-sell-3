import {Link} from 'react-router-dom';
import {AppRoute, OfferType, TicketType} from '../../const';
import {Ticket} from '../../types/ticket';

type TicketCardProps = {
  ticket: Ticket
}

function TicketCard({ticket}: TicketCardProps): JSX.Element {
  const {id, title, description, image, type, price} = ticket;

  return (
    <div className="ticket-card ticket-card--color06">
      <Link
        to={`${AppRoute.Ticket}/${id}`}
      >
        <div className="ticket-card__img">
          <img
            src={image}
            alt="Изображение товара {title}"
          />
        </div>
      </Link>
      <div className="ticket-card__info">
        <span className="ticket-card__label">
          {
            (OfferType.Buy === type)
              ? TicketType[OfferType.Buy]
              : TicketType[OfferType.Sell]
          }
        </span>
        <div className="ticket-card__header">
          <h3 className="ticket-card__title">
            <Link
              to={`${AppRoute.Ticket}/${id}`}
            >
              {title}
            </Link>
          </h3>
          <p className="ticket-card__price">
            <span className="js-sum">
              {price}
            </span> ₽
          </p>
        </div>
        <div className="ticket-card__desc">
          <p>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default TicketCard;
