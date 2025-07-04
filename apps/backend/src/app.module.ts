import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
//import { PostModule } from './post/post.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { LoggerMiddleware } from './common/logger.middleware';

@Module({
  imports: [
    PrismaModule.forRoot({ isGlobal: true }),
    UsersModule,
    PostsModule,
    CommentsModule,
    AuthModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
