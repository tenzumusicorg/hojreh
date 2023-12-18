import * as Redis from 'ioredis';
import { Injectable } from '@nestjs/common';

import { RedisService } from '@liaoliaots/nestjs-redis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class AuthRepository {
  private readonly redisClient: Redis.Redis;

  constructor(
    private readonly redisService: RedisService,
    private configService: ConfigService,
  ) {
    this.redisClient = redisService.getClient();
  }

  public async addRefreshToken(
    userEmail: string,
    refreshToken: string,
  ): Promise<void> {
    await this.redisClient.set(
      userEmail,
      refreshToken,
      'EX',
      this.configService.get<string>('REDIS_REFRESH_TOKEN_EXPIRE_TIME')!,
    );
  }

  public getToken(key: string): Promise<string | null> {
    return this.redisClient.get(key);
  }
}
