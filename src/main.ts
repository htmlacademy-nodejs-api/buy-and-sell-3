import Application from './app/application.js';
import LoggerService from './common/logger/logger.service.js';

const logger = new LoggerService();

const application = new Application(logger);
await application.init();
