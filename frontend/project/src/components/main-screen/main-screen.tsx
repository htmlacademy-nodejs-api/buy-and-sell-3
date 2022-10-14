import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import CategoryList from '../category-list/category-list';
import MainEmpty from '../main-empty/main-empty';
import TicketListMain from '../ticket-list-main/ticket-list-main';
import {TicketListTitle} from '../../const';

import {getLastTickets, getMoreCommentsTickets} from '../../store/tickets-data/selectors';
import {getCategories} from '../../store/categories-data/selectors';
import {fetchTicketsDiscussedAction, fetchTicketsNewAction} from '../../store/api-actions';

function MainScreen(): JSX.Element {
  const dispatch = useAppDispatch();

  const categories = useAppSelector(getCategories);

  const lastTickets = useAppSelector(getLastTickets);
  const moreCommentsTickets = useAppSelector(getMoreCommentsTickets);

  useEffect(() => {
    dispatch(fetchTicketsNewAction());
    dispatch(fetchTicketsDiscussedAction());
  }, [dispatch]);

  return (
    <main className="page-content">
      <h1 className="visually-hidden">Сервис объявлений &quot;Куплю. Продам&quot;</h1>
      {
        (
          categories.length === 0 &&
          (
            lastTickets.length === 0 || moreCommentsTickets.length === 0
          )
        )
          ? <MainEmpty />
          :
          <>
            <CategoryList
              categories={categories}
            />
            <TicketListMain
              title={TicketListTitle.LastTickets}
              tickets={lastTickets}
            />
            <TicketListMain
              title={TicketListTitle.MoreComments}
              tickets={moreCommentsTickets}
            />
          </>
      }
    </main>
  );
}

export default MainScreen;
