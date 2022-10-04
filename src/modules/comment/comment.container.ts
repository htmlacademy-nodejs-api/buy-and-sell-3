import {Container} from 'inversify';
import {types} from '@typegoose/typegoose';
import {CommentEntity, CommentModel} from './comment.entity.js';
import {CommentServiceInterface} from './comment-service.interface.js';
import {ControllerInterface} from '../../common/controller/controller.interface.js';
import CommentService from './comment.service.js';
import CommentController from './comment.controller.js';
import {Component} from '../../types/component.types.js';

const commentContainer = new Container();

commentContainer.bind<CommentServiceInterface>(Component.CommentServiceInterface).to(CommentService).inSingletonScope();
commentContainer.bind<types.ModelType<CommentEntity>>(Component.CommentModel).toConstantValue(CommentModel);
commentContainer.bind<ControllerInterface>(Component.CommentController).to(CommentController).inSingletonScope();

export {commentContainer};
