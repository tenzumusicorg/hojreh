import { RedisService } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisCacheService {
  private readonly redisClient: Redis;

  constructor(
    private readonly redisService: RedisService,
  ) {
    this.redisClient = redisService.getClient();
  }

  async clearCache(): Promise<any> {
    this.redisService.getClient().reset()
  }
}
