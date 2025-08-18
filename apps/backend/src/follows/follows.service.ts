import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FollowsService {
  constructor(private readonly prisma: PrismaService) {}

  async follow(meAuthSchId: string, targetAuthSchId: string): Promise<void> {
    if (meAuthSchId === targetAuthSchId) return;
    // ensure users exist
    const target = await this.prisma.user.findUnique({ where: { authSchId: targetAuthSchId } });
    if (!target) throw new NotFoundException('Target user not found');

    await this.prisma.follow.upsert({
      where: { followerId_followingId: { followerId: meAuthSchId, followingId: targetAuthSchId } },
      update: {},
      create: { followerId: meAuthSchId, followingId: targetAuthSchId },
    });
  }

  async unfollow(meAuthSchId: string, targetAuthSchId: string): Promise<void> {
    await this.prisma.follow.deleteMany({
      where: { followerId: meAuthSchId, followingId: targetAuthSchId },
    });
  }

  async followingIds(meAuthSchId: string): Promise<string[]> {
    const rows = await this.prisma.follow.findMany({
      where: { followerId: meAuthSchId },
      select: { followingId: true },
    });
    return rows.map((r) => r.followingId);
  }

  async followersOf(
    userAuthSchId: string
  ): Promise<{ follower: { authSchId: string; username: string; email: string } }[]> {
    return this.prisma.follow.findMany({
      where: { followingId: userAuthSchId },
      select: {
        follower: { select: { authSchId: true, username: true, email: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async followingOf(
    userAuthSchId: string
  ): Promise<{ following: { authSchId: string; username: string; email: string } }[]> {
    return this.prisma.follow.findMany({
      where: { followerId: userAuthSchId },
      select: {
        following: { select: { authSchId: true, username: true, email: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
