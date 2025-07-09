import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'nestjs-prisma';

import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { PostEntity } from './entities/post.entity';
import { PostWithAuthANdCommentDto } from './dto/postwith-auth-comment.dto';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createPostDto: CreatePostDto): Promise<PostEntity> {
    return this.prisma.post.create({
      data: {
        title: createPostDto.title,
        content: createPostDto.content,
        authorId: createPostDto.authorId,
        visible: createPostDto.visible,
      },
    });
  }

  async findAll(): Promise<PostEntity[]> {
    return this.prisma.post.findMany({
      where: {
        visible: true,
      },
    });
  }

  async getPostWithEveryDetail(): Promise<PostWithAuthANdCommentDto[]> {
    return this.prisma.post.findMany({
      where: {
        visible: true,
      },
      include: {
        author: true,
        comments: true,
      },
    });
  }

  async findOne(id: number): Promise<PostEntity> {
    try {
      return await this.prisma.post.findUniqueOrThrow({
        where: {
          postId: id,
        },
        include: {
          author: {
            select: {
              username: true,
              email: true,
            },
          },
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Post not found');
        }
        throw new InternalServerErrorException('Internal server error');
      }
    }
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<PostEntity> {
    try {
      return await this.prisma.post.update({
        where: {
          postId: id,
        },
        data: updatePostDto,
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        switch (e.code) {
          case 'P2000':
            throw new BadRequestException('The content is too long.');
          case 'P2025':
            throw new NotFoundException('This post does not exist.');
        }
      }
      throw new InternalServerErrorException('An error occurred.');
    }
  }

  async remove(id: number): Promise<PostEntity> {
    try {
      return await this.prisma.post.delete({
        where: {
          postId: id,
        },
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        switch (e.code) {
          case 'P2000':
            throw new BadRequestException('The content is too long.');
          case 'P2025':
            throw new NotFoundException('This post does not exist.');
        }
      }
      throw new InternalServerErrorException('An error occurred.');
    }
  }
}
