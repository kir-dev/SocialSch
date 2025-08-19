import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FollowerResponseDto, FollowingResponseDto } from './dto';
import { UserDto } from '../users/dto/user.dto';

@Injectable()
export class FollowsService {
  constructor(private readonly prisma: PrismaService) {}

  async follow(meAuthSchId: string, targetAuthSchId: string): Promise<void> {
    if (!meAuthSchId || !targetAuthSchId) {
      throw new BadRequestException('Invalid follower/target');
    }
    if (meAuthSchId === targetAuthSchId) {
      throw new BadRequestException('You cannot follow yourself');
    }

    const target = await this.prisma.user.findUnique({ where: { authSchId: targetAuthSchId } });
    if (!target) {
      throw new NotFoundException('Target user not found');
    }

    await this.prisma.follow.upsert({
      where: { followerId_followingId: { followerId: meAuthSchId, followingId: targetAuthSchId } },
      update: {},
      create: { followerId: meAuthSchId, followingId: targetAuthSchId },
    });
  }

  async unfollow(meAuthSchId: string, targetAuthSchId: string): Promise<void> {
    if (!meAuthSchId || !targetAuthSchId) {
      throw new BadRequestException('Invalid follower/target');
    }
    await this.prisma.follow.deleteMany({
      where: { followerId: meAuthSchId, followingId: targetAuthSchId },
    });
  }

  async followingIds(meAuthSchId: string): Promise<string[]> {
    if (!meAuthSchId) throw new BadRequestException('Invalid user');
    const rows = await this.prisma.follow.findMany({
      where: { followerId: meAuthSchId },
      select: { followingId: true },
    });
    return rows.map((r) => r.followingId);
  }

  async followersOf(userAuthSchId: string): Promise<FollowerResponseDto[]> {
    if (!userAuthSchId) throw new BadRequestException('Invalid user');

    const results = await this.prisma.follow.findMany({
      where: { followingId: userAuthSchId },
      select: {
        follower: { select: { authSchId: true, username: true, email: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return results.map(
      (result) =>
        new FollowerResponseDto({
          follower: new UserDto(result.follower),
        })
    );
  }

  async followingOf(userAuthSchId: string): Promise<FollowingResponseDto[]> {
    if (!userAuthSchId) throw new BadRequestException('Invalid user');

    const results = await this.prisma.follow.findMany({
      where: { followerId: userAuthSchId },
      select: {
        following: { select: { authSchId: true, username: true, email: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return results.map(
      (result) =>
        new FollowingResponseDto({
          following: new UserDto(result.following),
        })
    );
  }
}
