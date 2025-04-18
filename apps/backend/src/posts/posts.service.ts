import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'nestjs-prisma';
import { User } from '../users/entities/user.entity';
import { Post } from './entities/post.entity';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}
  create(createPostDto: CreatePostDto, user: User): Promise<Post> {
    return this.prisma.post.create({
      data: {
        title: createPostDto.title,
        content: createPostDto.content,
        ...createPostDto,
        author: {
          connect: {
            userId: user.userId,
          },
        },
      },
    });
  }

  findAll(): Promise<Post[]> {
    return this.prisma.post.findMany({
      where: {
        visible: true,
      },
    });
  }

  async findOne(id: number): Promise<Post> {
    try {
      return await this.prisma.post.findUniqueOrThrow({
        where: {
          postId: id,
        },
        include: {
          author: {
            select: {
              userName: true,
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

  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
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

  async remove(id: number): Promise<Post> {
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
