import {User} from '../../types/user.type.js';
import typegoose, {getModelForClass} from '@typegoose/typegoose';

const {prop} = typegoose;

export class UserEntity implements User {
  @prop({ unique: true, required: true })
  public email!: string;

  @prop()
  public avatarPath!: string;

  @prop()
  public firstname!: string;

  @prop()
  public lastname!: string;

  @prop()
  public password!: string;
}

export const UserModel = getModelForClass(UserEntity);
