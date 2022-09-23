import {OfferType} from '../../../types/offer-type.enum.js';

export default class UpdateOfferDto {
  public title?: string;
  public description?: string;
  public postDate?: Date;
  public image?: string;
  public type?: OfferType;
  public price?: number;
  public categories?: string[];
}
