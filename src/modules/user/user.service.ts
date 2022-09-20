import 'reflect-metadata';
import {inject, injectable} from 'inversify';
import {UserEntity, UserModel} from './user.entity.js';
import {DocumentType} from '@typegoose/typegoose/lib/types.js';
import CreateUserDto from './dto/create-user.dto.js';
import {UserServiceInterface} from './user-service.interface.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {Component} from '../../types/component.types.js';

@injectable()
export default class UserService implements UserServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
  ) {}

  public async create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const user = new UserEntity(dto);
    user.setPassword(dto.password, salt);

    const result = await UserModel.create(user);
    this.logger.info(`New user created: ${user.email}`);

    return result;
  }
}
