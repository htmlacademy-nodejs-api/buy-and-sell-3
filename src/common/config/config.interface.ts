import {ConfigSchema} from './config.schema.js';

export interface ConfigInterface {
  get<T extends keyof ConfigSchema>(key: T): ConfigSchema[T];
}
