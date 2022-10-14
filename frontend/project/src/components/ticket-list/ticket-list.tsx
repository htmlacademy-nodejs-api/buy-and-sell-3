import TicketCard from '../ticket-card/ticket-card';
import {Tickets} from '../../types/ticket';

type TicketsListProps = {
  tickets: Tickets
}

function TicketList({tickets}: TicketsListProps): JSX.Element {
  return (
    <ul>
      {
        tickets.map((ticket, index) => {
          const keyValue = `${index}-${ticket.id}`;
          return (
            <li
              key={keyValue}
              className="tickets-list__item"
            >
              <TicketCard
                ticket={ticket}
              />
            </li>
          );
        })
      }
    </ul>
  );
}

export default TicketList;
