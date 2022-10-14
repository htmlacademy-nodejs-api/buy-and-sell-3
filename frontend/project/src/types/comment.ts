import {User} from './user';

export type Comment = {
  id: string,
  text: string,
  user: User,
}

export type CommentPost = {
  ticketId: string,
  text: string,
}

export type Comments = Comment[]
