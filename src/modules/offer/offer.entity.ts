import typegoose, {defaultClasses, getModelForClass, Ref} from '@typegoose/typegoose';
import {OfferType} from '../../types/offer-type.enum.js';
import {CategoryEntity} from '../category/category.entity.js';
import {UserEntity} from '../user/user.entity.js';

const {prop, modelOptions} = typegoose;

export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({trim: true, required: true})
  public title!: string;

  @prop({trim: true})
  public description!: string;

  @prop({default: ''})
  public image!: string;

  @prop()
  public postDate!: Date;

  @prop()
  public price!: number;

  @prop({
    type: () => String,
    enum: OfferType
  })
  public type!: OfferType;

  @prop({default: 0})
  public commentCount!: number;

  @prop({
    ref: CategoryEntity,
    required: true,
    default: [],
    _id: false
  })
  public categories!: Ref<CategoryEntity>[];

  @prop({
    ref: UserEntity,
    required: true
  })
  public userId!: Ref<UserEntity>;
}

export const OfferModel = getModelForClass(OfferEntity);
