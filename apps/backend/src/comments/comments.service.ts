import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentEntity } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  create(createCommentDto: CreateCommentDto): Promise<CommentEntity> {
    return 'This action adds a new comment';
  }

  findAll(): Promise<CommentEntity> {
    return `This action returns all comments`;
  }

  findOne(id: number): Promise<CommentEntity> {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto): Promise<CommentEntity> {
    return `This action updates a #${id} comment`;
  }

  remove(id: number): Promise<CommentEntity> {
    return `This action removes a #${id} comment`;
  }
}
