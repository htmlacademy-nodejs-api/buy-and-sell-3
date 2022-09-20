import {Container} from 'inversify';
import {UserServiceInterface} from './user-service.interface.js';
import UserService from './user.service.js';
import {Component} from '../../types/component.types.js';

const userContainer = new Container();

userContainer.bind<UserServiceInterface>(Component.UserServiceInterface).to(UserService);

export {userContainer};
