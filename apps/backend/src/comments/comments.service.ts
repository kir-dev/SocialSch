import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentEntity } from './entities/comment.entity';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCommentDto: CreateCommentDto): Promise<CommentEntity> {
    return this.prisma.comment.create({
      data: {
        content: createCommentDto.content,
        postId: createCommentDto.postId,
        authorId: createCommentDto.authorId,
        visible: true,
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
        author: {
          select: {
            authSchId: true,
            username: true,
          },
        },
      },
    });
  }

  async findOne(id: number): Promise<CommentEntity> {
    return this.prisma.comment.findUnique({
      where: {
        commentId: id,
      },
      include: {
        author: {
          select: {
            authSchId: true,
            username: true,
          },
        },
      },
    });
  }

  async findCommentsByAuthorId(authorId: string): Promise<CommentEntity[]> {
    return this.prisma.comment.findMany({
      where: {
        authorId: authorId,
      },
    });
  }

  async update(id: number, updateCommentDto: UpdateCommentDto, _user: User): Promise<CommentEntity> {
    return this.prisma.comment.update({
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
