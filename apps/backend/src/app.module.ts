import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AddedUserModule } from './added_user/added_user.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [PrismaModule.forRoot({ isGlobal: true }), AddedUserModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
