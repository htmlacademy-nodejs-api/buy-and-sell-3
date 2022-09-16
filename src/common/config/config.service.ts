import {ConfigInterface} from './config.interface.js';

export default class ConfigService implements ConfigInterface {
  private config: NodeJS.ProcessEnv;

  constructor() {
    this.config = process.env;
  }

  public get(key: string): string | undefined {
    return this.config[key];
  }
}
