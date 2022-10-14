import CategoryDto from '../../dto/category/category.dto';
import CommentDto from '../../dto/comment/comment.dto';
import OfferDto from '../../dto/offer/offer.dto';
import UserWithTokenDto from '../../dto/user/user-with-token.dto';
import UserDto from '../../dto/user/user.dto';
import {Categories} from '../../types/category';
import {Comments} from '../../types/comment';
import {Tickets} from '../../types/ticket';
import {User} from '../../types/user';


export const adaptCategoriesToClient =
  (categories: CategoryDto[]): Categories =>
    categories
      .map((category: CategoryDto) => ({
        id: category.id,
        title: category.name,
        image: category.image,
        itemsCount: Number(category.offerCount),
      }));

export const adaptLoginToClient =
  (user: UserWithTokenDto): User => ({
    name: user.firstname,
    surname: user.lastname,
    email: user.email,
    avatar: user.avatarPath,
    token: user.token,
  });

export const adaptUserToClient =
  (user: UserDto): User => ({
    name: user.firstname,
    surname: user.lastname,
    email: user.email,
    avatar: user.avatarPath,
  });

export const adaptOffersToClient =
  (offers: OfferDto[]): Tickets =>
    offers
      .filter((offer: OfferDto) =>
        offer.user !== null,
      )
      .map((offer: OfferDto) => ({
        id: offer.id,
        title: offer.title,
        description: offer.description,
        publishedDate: offer.postDate,
        image: offer.image,
        type: offer.type,
        commentsCount: offer.commentCount,
        user: adaptUserToClient(offer.user),
        categories: adaptCategoriesToClient(offer.categories),
        price: offer.price,
      }));

export const adaptCommentsToClient =
  (comments: CommentDto[]): Comments =>
    comments
      .filter((comment: CommentDto) =>
        comment.user !== null,
      )
      .map((comment: CommentDto) => ({
        id: comment.id,
        text: comment.text,
        publishedDate: comment.postDate,
        user: adaptUserToClient(comment.user),
      }));
