import {Controller} from '../../common/controller/controller.js';
import {inject, injectable} from 'inversify';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import {Request, Response} from 'express';
import CreateUserDto from './dto/create-user.dto.js';

@injectable()
export default class UserController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
  ) {
    super(logger);
    this.logger.info('Register routes for UserController…');

    this.addRoute({path: '/register', method: HttpMethod.Post, handler: this.create});
  }

  public async create(
    _req: Request<Record<string, unknown>, Record<string, unknown>, CreateUserDto>,
    _res: Response
  ): Promise<void> {
    throw new Error('[UserController] Oops');
  }
}
