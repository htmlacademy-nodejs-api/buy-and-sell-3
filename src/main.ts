import 'reflect-metadata';
import {Container} from 'inversify';
import {applicationContainer} from './app/application.container.js';
import Application from './app/application.js';
import {Component} from './types/component.types.js';

const mainContainer = Container.merge(applicationContainer);

async function bootstrap() {
  const application = mainContainer.get<Application>(Component.Application);
  await application.init();
}

bootstrap();
