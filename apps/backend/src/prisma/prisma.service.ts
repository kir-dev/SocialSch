import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from 'src/generated/prisma/client/client';
import { ConfigService } from '@nestjs/config';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(private readonly config: ConfigService) {
    const adapter = new PrismaPg({ connectionString: config.get('DATABASE_URL') });
    super({ adapter });
  }
  async onModuleInit(): Promise<void> {
    await this.$connect();
  }
}
