import { readFileSync } from 'fs';
import { OfferType } from '../../types/offer-type.enum.js';
import { Offer } from '../../types/offer.type.js';
import { FileReaderInterface } from './file-reader.interface.js';

export default class TSVFileReader implements FileReaderInterface {
  private rawData = '';

  constructor(public filename: string) { }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf8' });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      return [];
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim() !== '')
      .map((line) => line.split('\t'))
      .map(([title, description, createdDate, image, type, price, categories, firstname, lastname, email, avatarPath]) => ({
        title,
        description,
        postDate: new Date(createdDate),
        image,
        type: OfferType[type as 'Buy' | 'Sell'],
        categories: categories.split(';')
          .map((name) => ({name})),
        price: Number.parseInt(price, 10),
        user: {email, firstname, lastname, avatarPath},
      }));
  }
}
