import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Like } from './entities/like.entity';

@Injectable()
export class LikesService {
  constructor(private prisma: PrismaService) {}

  async create(createLikeDto: CreateLikeDto): Promise<Like> {
    const { userId, postId } = createLikeDto;

    const post = await this.prisma.post.findUnique({
      where: { postId },
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }

    const existingLike = await this.prisma.like.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    if (existingLike) {
      throw new ConflictException('User has already liked this post');
    }

    return this.prisma.like.create({
      data: {
        userId,
        postId,
      },
    });
  }

  async findAll(): Promise<Like[]> {
    return this.prisma.like.findMany();
  }

  async findOne(id: number): Promise<Like> {
    const like = await this.prisma.like.findUnique({
      where: { likeId: id },
    });

    if (!like) {
      throw new NotFoundException(`Like with ID ${id} not found`);
    }

    return like;
  }

  async update(id: number, updateLikeDto: UpdateLikeDto): Promise<Like> {
    return this.prisma.like.update({
      where: { likeId: id },
      data: updateLikeDto,
    });
  }

  async remove(id: number): Promise<void> {
    await this.prisma.like.delete({
      where: { likeId: id },
    });
  }

  async getLikeCount(postId: number): Promise<number> {
    return this.prisma.like.count({
      where: { postId },
    });
  }

  async toggleLike(userId: string, postId: number): Promise<{ liked: boolean; count: number }> {
    const existingLike = await this.prisma.like.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    if (existingLike) {
      await this.prisma.like.delete({
        where: {
          userId_postId: {
            userId,
            postId,
          },
        },
      });

      const count = await this.getLikeCount(postId);
      return { liked: false, count };
    } else {
      await this.prisma.like.create({
        data: {
          userId,
          postId,
        },
      });

      const count = await this.getLikeCount(postId);
      return { liked: true, count };
    }
  }

  async hasUserLikedPost(userId: string, postId: number): Promise<boolean> {
    const like = await this.prisma.like.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    return !!like;
  }
}
