import UpdateOfferDto from '../../dto/offer/update-offer.dto';
import CreateUserDto from '../../dto/user/create-user.dto';
import {TicketCreate, TicketEdit} from '../../types/ticket';
import {Signup} from '../../types/user';
import {OfferType} from '../../const';
import CreateOfferDto from '../../dto/offer/create-offer.dto';
import {CommentPost} from '../../types/comment';
import CreateCommentDto from '../../dto/comment/create-comment.dto';
import {getTime} from '../utils';

export const adaptSignupToServer =
  (user: Signup): CreateUserDto => ({
    firstname: user.name,
    lastname: user.surname,
    email: user.email,
    avatarPath: ' ',
    password: user.password,
  });

export const adaptEditTicketToServer =
  (ticket: TicketEdit): UpdateOfferDto => ({
    title: ticket.title,
    description: ticket.description,
    categories: ticket.categories,
    postDate: new Date(ticket.publishedDate),
    type: (ticket.type === OfferType.Buy) ? OfferType.Buy : OfferType.Sell,
    price: ticket.price,
  });

export const adaptCreateTicketToServer =
  (ticket: TicketCreate): CreateOfferDto => ({
    title: ticket.title,
    description: ticket.description,
    categories: ticket.categories,
    postDate: getTime(),
    image: ' ',
    type: (ticket.type === OfferType.Buy) ? OfferType.Buy : OfferType.Sell,
    price: ticket.price,
  });

export const adaptCreateCommentToServer =
  (comment: CommentPost): CreateCommentDto => ({
    text: comment.text,
    offerId: comment.ticketId,
  });

export const adaptAvatarToServer =
  (file: string) => {
    const formData = new FormData();
    formData.set('avatar', file);

    return formData;
  };

export const adaptImageToServer =
  (file: string) => {
    const formData = new FormData();
    formData.set('image', file);

    return formData;
  };
