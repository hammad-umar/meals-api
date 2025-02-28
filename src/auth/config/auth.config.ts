import { registerAs } from '@nestjs/config';
import { IsNotEmpty, IsString } from 'class-validator';
import { AuthConfigType } from './auth-config.type';
import { validateConfig } from '../../common';

class EnvironmentVariablesValidator {
  @IsString()
  @IsNotEmpty()
  JWT_SECRET: string;

  @IsString()
  @IsNotEmpty()
  JWT_EXPIRES_IN: string;
}

export default registerAs<AuthConfigType>('auth', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    secret: process.env.JWT_SECRET,
    expires: process.env.JWT_EXPIRES_IN,
  };
});
