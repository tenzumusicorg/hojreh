import { Global, Module } from '@nestjs/common';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { ConfigService } from '@nestjs/config';
import { RedisCacheService } from './redis.service';

@Global()
@Module({
  imports: [
    RedisModule.forRootAsync({
      useFactory: (cfg: ConfigService) => {
        return cfg.get('ENVIRONMENT') == 'staging' ||
          cfg.get('ENVIRONMENT') == 'prod'
          ? {
              config: {
                host: cfg.get('REDIS_HOST'),
                port: cfg.get('REDIS_PORT'),
                username: cfg.get('REDIS_USERNAME'),
                password: cfg.get('REDIS_PASSWORD'),
                keyPrefix: cfg.get('REDIS__PREKEY'),
              },
            }
          : {
              config: {
                host: cfg.get('REDIS_HOST'),
                port: cfg.get('REDIS_PORT'),
              },
            };
      },
      inject: [ConfigService],
      imports: undefined,
    }),
  ],
  providers: [RedisCacheService],
  exports: [RedisCacheService],
})
export class RedisCacheModule {}
