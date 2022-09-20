import {UserEntity, UserModel} from './user.entity.js';
import {DocumentType} from '@typegoose/typegoose/lib/types.js';
import CreateUserDto from './dto/create-user.dto.js';
import {UserServiceInterface} from './user-service.interface.js';

export default class UserService implements UserServiceInterface {
  public async create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const user = new UserEntity(dto);
    user.setPassword(dto.password, salt);

    return UserModel.create(user);
  }
}
