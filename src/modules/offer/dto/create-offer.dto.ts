import {OfferType} from '../../../types/offer-type.enum.js';
import {IsArray, IsDateString, IsEnum, IsInt, IsMongoId, Max, MaxLength, Min, MinLength} from 'class-validator';

export default class CreateOfferDto {
  @MinLength(10, {message: 'Minimum title length must be 10'})
  @MaxLength(100, {message: 'Maximum title length must be 100'})
  public title!: string;

  @MinLength(20, {message: 'Minimum description length must be 20'})
  @MaxLength(1024, {message: 'Maximum description length must be 1024'})
  public description!: string;

  @IsDateString({}, {message: 'postDate must be valid ISO date'})
  public postDate!: Date;

  @MaxLength(256, {message: 'Too short for field «image»'})
  public image!: string;

  @IsEnum(OfferType, {message: 'type must be Buy and Sell'})
  public type!: OfferType;

  @IsInt({message: 'Price must be an integer'})
  @Min(100, {message: 'Minimum price is 100'})
  @Max(200000, {message: 'Maximum price is 200000'})
  public price!: number;

  @IsArray({message: 'Field categories must be an array'})
  @IsMongoId({each: true, message: 'Categories field must be an array of valid id'})
  public categories!: string[];

  @IsMongoId({message: 'userId field must be valid an id'})
  public userId!: string;
}
