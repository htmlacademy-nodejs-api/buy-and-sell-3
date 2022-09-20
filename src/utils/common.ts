import crypto from 'crypto';
import { OfferType } from '../types/offer-type.enum.js';
import { Offer } from '../types/offer.type.js';

export const createOffer = (row: string) => {
  const tokens = row.replace('\n', '').split('\t');
  const [title, description, createdDate, image, type, price, categories, firstname, lastname, email, avatarPath] = tokens;
  return {
    title,
    description,
    postDate: new Date(createdDate),
    image,
    type: OfferType[type as 'Buy' | 'Sell'],
    categories: categories.split(';')
      .map((name) => ({name})),
    price: Number.parseInt(price, 10),
    user: {email, firstname, lastname, avatarPath},
  } as Offer;
};

export const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : '';

export const createSHA256 = (line: string, salt: string): string => {
  const shaHasher = crypto.createHmac('sha256', salt);
  return shaHasher.update(line).digest('hex');
};
