import { registerAs } from '@nestjs/config';
import { IsEnum, IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';
import { AppConfigType } from './app.config.type';
import { Environment, validateConfig } from '../common';

class EnvironmentVariablesValidator {
  @IsEnum(Environment)
  @IsNotEmpty()
  NODE_ENV: Environment;

  @IsInt()
  @Min(0)
  @Max(65535)
  @IsNotEmpty()
  APP_PORT: number;

  @IsString()
  @IsNotEmpty()
  API_PREFIX: string;

  @IsString()
  @IsNotEmpty()
  APP_NAME: string;
}

export default registerAs<AppConfigType>('app', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    nodeEnv: process.env.NODE_ENV,
    name: process.env.APP_NAME,
    port: parseInt(process.env.APP_PORT, 10),
    apiPrefix: process.env.API_PREFIX,
  };
});
