import { AppConfigType } from './app.config.type';
import { DatabaseConfigType } from '../database/config/database-config.type';

export type AllConfigType = {
  app: AppConfigType;
  database: DatabaseConfigType;
};
