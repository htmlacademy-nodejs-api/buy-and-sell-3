import {useContext, useEffect} from 'react';
import {Navigate, useParams} from 'react-router-dom';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {UserContext} from '../../context/user';
import {AppRoute} from '../../const';

import TicketViewContent from '../ticket-view-content/ticket-view-content';
import CommentsBlock from '../comments-block/comments-block';

import {getTicketById} from '../../store/tickets-data/selectors';
import {getComments} from '../../store/comments-data/selectors';
import {fetchCommentsAction} from '../../store/api-actions';

function TicketViewScreen(): JSX.Element {
  const {ticketId} = useParams();

  const dispatch = useAppDispatch();

  const ticket = useAppSelector((state) =>
    getTicketById(state, ticketId),
  );

  useEffect(() => {
    (ticketId) &&
      dispatch(fetchCommentsAction(ticketId));
  }, [ticketId, dispatch]);

  const comments = useAppSelector(getComments);

  const {user} = useContext(UserContext);

  if (!ticketId || !ticket) {
    return <Navigate to={AppRoute.Root} />;
  }

  return (
    <main className="page-content">
      <section className="ticket">
        <div className="ticket__wrapper">
          <h1 className="visually-hidden">Карточка объявления</h1>
          <TicketViewContent
            ticket={ticket}
            user={user}
          />
          <CommentsBlock
            commentItems={comments}
            user={user}
            ticketId={ticket.id || ''}
          />
        </div>
      </section>
    </main>
  );
}

export default TicketViewScreen;
