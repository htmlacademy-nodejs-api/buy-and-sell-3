import {inject, injectable} from 'inversify';
import {DocumentType, ModelType} from '@typegoose/typegoose/lib/types.js';
import {CategoryServiceInterface} from './category-service.interface.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {CategoryEntity} from './category.entity.js';
import CreateCategoryDto from './dto/create-category.dto.js';

@injectable()
export default class CategoryService implements CategoryServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(Component.CategoryModel) private readonly categoryModel: ModelType<CategoryEntity>
  ) {}

  public async create(dto: CreateCategoryDto): Promise<DocumentType<CategoryEntity>> {
    const result = await this.categoryModel.create(dto);
    this.logger.info(`New category created: ${dto.name}`);
    return result;
  }

  public async findByCategoryId(categoryId: string): Promise<DocumentType<CategoryEntity> | null> {
    return this.categoryModel.findById(categoryId).exec();
  }

  public async findByCategoryName(categoryName: string): Promise<DocumentType<CategoryEntity> | null> {
    return this.categoryModel.findOne({name: categoryName}).exec();
  }

  public async findByCategoryNameOrCreate(categoryName: string, dto: CreateCategoryDto): Promise<DocumentType<CategoryEntity>> {
    const existedCategory = await this.findByCategoryName(categoryName);

    if (existedCategory) {
      return existedCategory;
    }

    return this.create(dto);
  }
}
