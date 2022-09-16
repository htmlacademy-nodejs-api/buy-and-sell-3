import Application from './app/application.js';
import LoggerService from './common/logger/logger.service.js';
import ConfigService from './common/config/config.service.js';

const logger = new LoggerService();
const config = new ConfigService(logger);

const application = new Application(logger, config);
await application.init();
