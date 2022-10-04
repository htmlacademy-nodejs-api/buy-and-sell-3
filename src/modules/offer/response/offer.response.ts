import {Expose, Type} from 'class-transformer';
import UserResponse from '../../user/response/user.response.js';
import CategoryResponse from '../../category/response/category.response.js';

export default class OfferResponse {
  @Expose()
  public id!: string;

  @Expose()
  public title!: string;

  @Expose()
  public description!: string;

  @Expose()
  public image!: string;

  @Expose()
  public postDate!: string;

  @Expose()
  public price!: number;

  @Expose()
  public type!: string;

  @Expose()
  public commentCount!: number;

  @Expose()
  @Type(() => CategoryResponse)
  public categories!: CategoryResponse[];

  @Expose({ name: 'userId'})
  @Type(() => UserResponse)
  public user!: UserResponse;
}
