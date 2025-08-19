import { Controller, Get, Post, Delete, Param, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { FollowsService } from './follows.service';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '@kir-dev/passport-authsch';

interface AuthenticatedRequest extends Request {
  user: {
    authSchId: string;
  };
}

@UseGuards(AuthGuard('jwt'))
@Controller('follows')
export class FollowsController {
  constructor(private readonly followsService: FollowsService) {}

  // List the IDs I am following (for button state)
  @Get('ids')
  async myFollowingIds(@CurrentUser() user: { authSchId: string }): Promise<string[]> {
    return this.followsService.followingIds(user.authSchId);
  }

  // List users I follow
  @Get('following/:userId')
  async followingOf(
    @Param('userId') userId: string
  ): Promise<{ following: { authSchId: string; username: string; email: string } }[]> {
    return this.followsService.followingOf(userId);
  }

  // List users who follow me
  @Get('followers/:userId')
  async followersOf(
    @Param('userId') userId: string
  ): Promise<{ follower: { authSchId: string; username: string; email: string } }[]> {
    return this.followsService.followersOf(userId);
  }

  // Follow target
  @Post(':targetId')
  async follow(@Param('targetId') targetId: string, @Req() req: AuthenticatedRequest): Promise<{ ok: boolean }> {
    await this.followsService.follow(req.user.authSchId, targetId);
    return { ok: true };
  }

  // Unfollow target
  @Delete(':targetId')
  async unfollow(@Param('targetId') targetId: string, @Req() req: AuthenticatedRequest): Promise<{ ok: boolean }> {
    await this.followsService.unfollow(req.user.authSchId, targetId);
    return { ok: true };
  }
}
