import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentEntity } from './entities/comment.entity';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCommentDto: CreateCommentDto): Promise<CommentEntity> {
    return this.prisma.comment.create({
      data: {
        content: createCommentDto.content,
        postId: createCommentDto.postId,
        userId: createCommentDto.userId,
        ...createCommentDto,
      },
    });
  }

  async findAll(postId?: number): Promise<CommentEntity[]> {
    return this.prisma.comment.findMany({
      where: {
        visible: true,
        postId: postId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        User: {
          select: {
            userId: true,
            userName: true,
          },
        },
      },
    });
  }

  async findOne(id: number): Promise<CommentEntity> {
    return await this.prisma.comment.findUnique({
      where: {
        commentId: id,
      },
      include: {
        User: {
          select: {
            userId: true,
            userName: true,
          },
        },
      },
    });
  }

  async update(id: number, updateCommentDto: UpdateCommentDto): Promise<CommentEntity> {
    return await this.prisma.comment.update({
      where: {
        commentId: id,
      },
      data: {
        content: updateCommentDto.content,
        visible: updateCommentDto.visible,
      },
    });
  }

  remove(id: number): Promise<CommentEntity> {
    return this.prisma.comment.delete({
      where: {
        commentId: id,
      },
    });
  }
}
