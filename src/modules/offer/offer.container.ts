import {Container} from 'inversify';
import {types} from '@typegoose/typegoose';
import {OfferEntity, OfferModel} from './offer.entity.js';
import {OfferServiceInterface} from './offer-service.interface.js';
import OfferService from './offer.service.js';
import {Component} from '../../types/component.types.js';

const offerContainer = new Container();

offerContainer.bind<OfferServiceInterface>(Component.OfferServiceInterface).to(OfferService);
offerContainer.bind<types.ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);

export {offerContainer};
