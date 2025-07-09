import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { User } from 'src/users/entities/user.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentEntity } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCommentDto: CreateCommentDto): Promise<CommentEntity> {
    return this.prisma.comment.create({
      data: {
        content: createCommentDto.content,
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
