
import 'reflect-metadata';
import {Container} from 'inversify';
import {LoggerInterface} from './common/logger/logger.interface.js';
import LoggerService from './common/logger/logger.service.js';
import {Component} from './types/component.types.js';
import {ConfigInterface} from './common/config/config.interface.js';
import ConfigService from './common/config/config.service.js';
import Application from './app/application.js';

const applicationContainer = new Container();
applicationContainer.bind<Application>(Component.Application).to(Application);
applicationContainer.bind<LoggerInterface>(Component.LoggerInterface).to(LoggerService);
applicationContainer.bind<ConfigInterface>(Component.ConfigInterface).to(ConfigService);

const application = applicationContainer.get<Application>(Component.Application);
await application.init();
