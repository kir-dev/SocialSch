import { Module } from '@nestjs/common';
import { AddedUserService } from './added_user.service';
import { AddedUserController } from './added_user.controller';

@Module({
  controllers: [AddedUserController],
  providers: [AddedUserService],
})
export class AddedUserModule {}
