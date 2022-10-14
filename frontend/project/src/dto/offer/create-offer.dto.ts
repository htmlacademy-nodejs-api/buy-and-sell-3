enum OfferType {
  Buy = 'Buy',
  Sell = 'Sell',
}

export default class CreateOfferDto {
  public title!: string;

  public description!: string;

  public postDate!: string;

  public image!: string;

  public type!: OfferType;

  public price!: number;

  public categories!: string[];
}
