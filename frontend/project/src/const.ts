export enum AppRoute {
  Root = '/',
  Category = '/category',
  Login = '/login',
  Signup = '/sign-up',
  Ticket = '/ticket',
  TicketCreate  = '/ticket/create',
  TicketEdit  = '/ticket/edit',
}

export enum TicketListTitle {
  ListCategory = 'Объявления категории',
  LastTickets = 'Самое свежее',
  MoreComments = 'Самые обсуждаемые',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const TICKET_DATE_RANGE = 10;

export const ID_LENGTH = 5;

export enum NameSpace {
  Categories = 'CATEGORIES',
  Tickets = 'TICKETS',
  Comments = 'COMMENTS',
  User = 'USER',
}

export enum TicketType {
  Buy = 'Куплю',
  Sell = 'Продам',
}

export enum OfferType {
  Buy = 'Buy',
  Sell = 'Sell',
}

export enum APIRoute {
  Categories = '/categories',
  Tickets = '/offers',
  TicketsNew = '/offers/bundles/new',
  TicketsDiscussed = 'offers/bundles/discussed',
  Comments = '/comments',
  Registration = '/register',
  Login = '/login',
  Logout = '/logout',
}

export enum HTTP_CODE {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
}
