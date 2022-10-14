import {useParams} from 'react-router-dom';
import {useAppSelector} from '../../hooks';
import TicketForm from '../ticket-form/ticket-form';

import {getTickets} from '../../store/tickets-data/selectors';

function TicketScreen(): JSX.Element {
  const {ticketId} = useParams();

  const tickets = useAppSelector(getTickets);

  const ticket = tickets.find((ticketItem) => ticketItem.id === ticketId);

  return (
    <main className="page-content">
      <section className="ticket-form">
        <div className="ticket-form__wrapper">
          <h1 className="ticket-form__title">
            {
              (ticket)
                ? 'Редактировать публикацию'
                : 'Новая публикация'
            }
          </h1>
          <div className="ticket-form__tile">
            <TicketForm
              ticket={ticket}
            />
          </div>
        </div>
      </section>
    </main>
  );
}

export default TicketScreen;
