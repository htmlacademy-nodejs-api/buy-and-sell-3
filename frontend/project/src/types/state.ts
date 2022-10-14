import {store} from '../store';
import {Categories} from './category';
import {Comments} from './comment';
import {Tickets} from './ticket';
import {User} from './user';
import {AuthorizationStatus} from '../const';

export type CategoriesState = {
  categories: Categories,
  isLoading: boolean,
};

export type TicketsState = {
  tickets: Tickets,
  ticketsNew: Tickets,
  ticketsDiscussed: Tickets,
  isLoading: boolean,
};

export type CommentsState = {
  comments: Comments,
  isLoading: boolean,
};

export type UserState = {
  authorizationStatus: AuthorizationStatus;
  user: User | null;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
