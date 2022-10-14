import {User} from './user';
import {Categories} from './category';

export type TicketWithoutCategory = {
  id?: string,
  title: string,
  description: string,
  publishedDate: string,
  image: string,
  type: string,
  commentsCount: number,
  user: User,
  price: number,
}

export type Ticket = TicketWithoutCategory & {
  categories: Categories,
}
export type TicketEdit = Omit<TicketWithoutCategory, 'user'> & {
  categories: string[],
  imageStatus?: boolean
};

export type TicketCreate = Omit<TicketEdit, 'id' |'publishedDate' | 'commentsCount'>;

export type Tickets = Ticket[]
