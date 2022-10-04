import {OfferType} from '../../../types/offer-type.enum.js';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsMongoId,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength
} from 'class-validator';

export default class UpdateOfferDto {
  @IsOptional()
  @MinLength(10,{message: 'Minimum title length must be 10'})
  @MaxLength(100, {message: 'Maximum title length must be 100'})
  public title?: string;

  @IsOptional()
  @MinLength(20, {message: 'Minimum description length must be 20'})
  @MaxLength(1024, {message: 'Maximum description length must be 1024'})
  public description?: string;

  @IsOptional()
  @IsDateString({}, {message: 'postDate must be valid ISO date'})
  public postDate?: Date;

  @IsOptional()
  @IsString({message: 'image is required'})
  @MaxLength(256, {message: 'Too short for field «image»'})
  public image?: string;

  @IsOptional()
  @IsEnum(OfferType, {message: 'type must be Buy and Sell'})
  public type?: OfferType;

  @IsOptional()
  @IsInt({message: 'Price must be an integer'})
  @Min(100, {message: 'Minimum price is 100'})
  @Max(200000, {message: 'Maximum price is 200000'})
  public price?: number;

  @IsOptional()
  @IsMongoId({each: true, message: 'Categories field must be an array of valid id'})
  public categories?: string[];
}
