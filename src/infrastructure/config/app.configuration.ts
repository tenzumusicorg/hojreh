import { plainToClass } from 'class-transformer';
import { IsNumber, IsString, validateSync } from 'class-validator';

export enum Environment {
  local = 'local',
  dev = 'dev',
  prod = 'prod',
}

class EnvironmentVariables {
  @IsString()
  SERVER_HOST: string;

  @IsNumber()
  SERVER_PORT: number;

  @IsString()
  ENVIRONMENT: string;

  @IsString()
  MONGODB_URL: string;

  @IsString()
  REDIS_URL: string;

  @IsString()
  REDIS_HOST: string;

  @IsNumber()
  REDIS_PORT: number;

  @IsString()
  REDIS_USERNAME: string;

  @IsString()
  REDIS_PASSWORD: string;

  @IsNumber()
  REDIS_OTP_EXPIRE_TIME: number;

  @IsNumber()
  REDIS_REFRESH_TOKEN_EXPIRE_TIME: number;

  @IsString()
  MAIL_SERVER_HOST: string;

  @IsString()
  REDIS__PREKEY: string;

  @IsString()
  MAIL_SERVER_PASSWORD: string;

  @IsString()
  USER_REFRESH_TOKEN_EXPIRE_TIME: string;

  @IsString()
  USER_REFRESH_TOKEN_SECRET: string;

  @IsString()
  USER_ACCESS_TOKEN_EXPIRE_TIME: string;

  @IsString()
  USER_ACCESS_TOKEN_SECRET: string;

  @IsString()
  ADMIN_REFRESH_TOKEN_EXPIRE_TIME: string;

  @IsString()
  ADMIN_REFRESH_TOKEN_SECRET: string;

  @IsString()
  ADMIN_ACCESS_TOKEN_EXPIRE_TIME: string;

  @IsString()
  ADMIN_ACCESS_TOKEN_SECRET: string;
}

export enum ConfigValues {
  SERVER_HOST = 'SERVER_HOST',
  SERVER_PORT = 'SERVER_PORT',
  ENVIRONMENT = 'ENVIRONMENT',
  MONGODB_URL = 'MONGODB_URL',

  USER_REFRESH_TOKEN_EXPIRE_TIME = 'USER_REFRESH_TOKEN_EXPIRE_TIME',
  USER_REFRESH_TOKEN_SECRET = 'USER_REFRESH_TOKEN_SECRET',
  USER_ACCESS_TOKEN_EXPIRE_TIME = 'USER_ACCESS_TOKEN_EXPIRE_TIME',
  USER_ACCESS_TOKEN_SECRET = 'USER_ACCESS_TOKEN_SECRET',
  ADMIN_REFRESH_TOKEN_EXPIRE_TIME = 'ADMIN_REFRESH_TOKEN_EXPIRE_TIME',
  ADMIN_REFRESH_TOKEN_SECRET = 'ADMIN_REFRESH_TOKEN_SECRET',
  ADMIN_ACCESS_TOKEN_EXPIRE_TIME = 'ADMIN_ACCESS_TOKEN_EXPIRE_TIME',
  ADMIN_ACCESS_TOKEN_SECRET = 'ADMIN_ACCESS_TOKEN_SECRET',

  REDIS_URL = 'REDIS_URL',
  REDIS_HOST = 'REDIS_HOST',
  REDIS_PORT = 'REDIS_PORT',
  REDIS_USERNAME = 'REDIS_USERNAME',
  REDIS_PASSWORD = 'REDIS_PASSWORD',
  REDIS__PREKEY = 'REDIS__PREKEY',
  REDIS_OTP_EXPIRE_TIME = 'REDIS_OTP_EXPIRE_TIME',
  REDIS_REFRESH_TOKEN_EXPIRE_TIME = 'REDIS_REFRESH_TOKEN_EXPIRE_TIME',
}

export function validateEnvs(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
