import {User} from '../../types/user.type.js';

export class UserEntity implements User {
  public email!: string;
  public avatarPath!: string;
  public firstname!: string;
  public lastname!: string;
}
