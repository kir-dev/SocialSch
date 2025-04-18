import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostModule } from './post/post.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [PrismaModule.forRoot({ isGlobal: true }), UsersModule, PostModule, PostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
