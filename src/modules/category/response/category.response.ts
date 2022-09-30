import {Expose} from 'class-transformer';

export default class CategoryResponse {
  @Expose()
  public id!: string;

  @Expose()
  public name!: string;
}
