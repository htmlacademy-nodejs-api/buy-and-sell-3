import {defaultClasses} from '@typegoose/typegoose';
import typegoose, {getModelForClass} from '@typegoose/typegoose';
import {Category} from '../../types/category.type.js';

const {prop, modelOptions} = typegoose;

export interface CategoryEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'categories'
  }
})
export class CategoryEntity extends defaultClasses.TimeStamps implements Category {
  @prop({required: true, trim: true})
  public name!: string;
}

export const CategoryModel = getModelForClass(CategoryEntity);
