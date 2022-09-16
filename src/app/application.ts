import {LoggerInterface} from '../common/logger/logger.interface.js';

export default class Application {
  private logger!: LoggerInterface;

  constructor(logger: LoggerInterface) {
    this.logger = logger;
  }

  public async init() {
    this.logger.info('Application initialization…');
  }
}
