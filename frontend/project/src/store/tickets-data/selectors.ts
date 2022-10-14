import {createSelector} from '@reduxjs/toolkit';
import {State, TicketsState} from '../../types/state';
import {NameSpace} from '../../const';

export const getTicketById = createSelector(
  [
    (state: State) => state[NameSpace.Tickets],
    (_state: State, ticketId: string | undefined) => ticketId,
  ],
  (state: TicketsState, ticketId: string | undefined) =>
    (ticketId)
      ? state.tickets.find((ticket) => ticket.id === ticketId)
      : undefined,
);

export const getTickets = createSelector(
  (state: State) => state[NameSpace.Tickets],
  (state: TicketsState) => state.tickets,
);

export const getTicketsByCategoryId = createSelector(
  [
    (state: State) => state[NameSpace.Tickets],
    (_state: State, categoryId: string | undefined) => categoryId,
  ],
  (state: TicketsState, categoryId: string | undefined) =>
    (categoryId)
      ? state.tickets.filter(
        (ticket) =>
          ticket.categories
            .find((categoryItem) =>
              categoryItem.id === categoryId,
            ),
      )
      : [],
);

export const getLastTickets = createSelector(
  (state: State) => state[NameSpace.Tickets],
  (state: TicketsState) => state.ticketsNew,
);

export const getMoreCommentsTickets = createSelector(
  (state: State) => state[NameSpace.Tickets],
  (state: TicketsState) => state.ticketsDiscussed,
);

export const getTicketsStatus = createSelector(
  (state: State) => state[NameSpace.Tickets],
  (state: TicketsState) => state.isLoading,
);
