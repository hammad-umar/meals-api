import { registerAs } from '@nestjs/config';
import { IsString, IsNotEmpty } from 'class-validator';
import { validateConfig } from '../../common';
import { DatabaseConfigType } from './database-config.type';

class EnvironmentVariablesValidator {
  @IsString()
  @IsNotEmpty()
  DATABASE_URI: string;
}

export default registerAs<DatabaseConfigType>('database', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    uri: process.env.DATABASE_URI,
  };
});
