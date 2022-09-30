import {Request, Response} from 'express';
import {inject, injectable} from 'inversify';
import {Controller} from '../../common/controller/controller.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import {CategoryServiceInterface} from './category-service.interface.js';
import {StatusCodes} from 'http-status-codes';
import CategoryResponse from './response/category.response.js';
import {fillDTO} from '../../utils/common.js';
import CreateCategoryDto from './dto/create-category.dto.js';

@injectable()
export default class CategoryController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.CategoryServiceInterface) private readonly categoryService: CategoryServiceInterface,
  ) {
    super(logger);

    this.logger.info('Register routes for CategoryController…');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({path: '/', method: HttpMethod.Post, handler: this.create});
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const categories = await this.categoryService.find();
    const categoryResponse = fillDTO(CategoryResponse, categories);
    this.send(res, StatusCodes.OK, categoryResponse);
  }

  public async create(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, CreateCategoryDto>,
    res: Response): Promise<void> {

    const existCategory = await this.categoryService.findByCategoryName(body.name);

    if (existCategory) {
      const errorMessage = `Category with name «${body.name}» exists.`;
      this.send(res, StatusCodes.UNPROCESSABLE_ENTITY, {error: errorMessage});
      return this.logger.error(errorMessage);
    }

    const result = await this.categoryService.create(body);
    this.send(
      res,
      StatusCodes.CREATED,
      fillDTO(CategoryResponse, result)
    );
  }
}
