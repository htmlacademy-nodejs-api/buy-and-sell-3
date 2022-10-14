import TicketList from '../ticket-list/ticket-list';
import {TicketListTitle} from '../../const';
import {Tickets} from '../../types/ticket';
import {Category} from '../../types/category';

type TickerListProps = {
  title: TicketListTitle,
  category?: Category | undefined,
  tickets: Tickets,
};

function TicketListMain(props: TickerListProps): JSX.Element {
  const {title, category, tickets} = props;

  return (
    <section className="tickets-list">
      <h2 className="visually-hidden">
        {title}
      </h2>
      <div className="tickets-list__wrapper">
        <div className="tickets-list__header">
          <p className="tickets-list__title">
            {
              (category)
                ? `${title} ${category.title} ${tickets.length}`
                : title
            }
          </p>
        </div>
        <TicketList
          tickets={tickets}
        />
      </div>
    </section>
  );
}

export default TicketListMain;
