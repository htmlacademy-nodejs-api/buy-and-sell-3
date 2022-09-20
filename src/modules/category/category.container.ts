import {Container} from 'inversify';
import {types} from '@typegoose/typegoose';
import {CategoryEntity, CategoryModel} from './category.entity.js';
import {CategoryServiceInterface} from './category-service.interface.js';
import CategoryService from './category.service.js';
import {Component} from '../../types/component.types.js';

const categoryContainer = new Container();

categoryContainer.bind<CategoryServiceInterface>(Component.CategoryServiceInterface).to(CategoryService);
categoryContainer.bind<types.ModelType<CategoryEntity>>(Component.CategoryModel).toConstantValue(CategoryModel);

export {categoryContainer};
