import UserDto from '../../dto/user/user.dto';
import CategoryDto from '../../dto/category/category.dto';

export default class OfferDto {
  public id!: string;

  public title!: string;

  public description!: string;

  public image!: string;

  public postDate!: string;

  public price!: number;

  public type!: string;

  public commentCount!: number;

  public categories!: CategoryDto[];

  public user!: UserDto;
}
