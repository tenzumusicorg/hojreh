import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { Environment } from '../config/app.configuration';

@Injectable()
export class DatabaseService {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    private configService: ConfigService,
  ) {}

  getDbHandle(): Connection {
    const { connection } = this;
    return connection;
  }

  async dropDatabase() {
    let isDev =
      this.configService.get<string>('ENVIRONMENT') === Environment.dev;
    if (isDev) await this.connection.dropDatabase();
    console.log(this.configService.get<string>('MONGODB_URL'));
  }
}
