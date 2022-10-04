import {IsString, Length} from 'class-validator';

export default class CreateCategoryDto {
  @IsString({message: 'name is required'})
  @Length(4, 12, {message: 'Min length is 4, max is 12'})
  public name!: string;
}
