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
}

export enum ConfigValues {
  SERVER_HOST = 'SERVER_HOST',
  SERVER_PORT = 'SERVER_PORT',
  ENVIRONMENT = 'ENVIRONMENT',
  MONGODB_URL = 'MONGODB_URL',
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
