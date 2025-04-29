import { OmitType } from '@nestjs/swagger';
import { CommentEntity } from '../entities/comment.entity';

export class CreateCommentDto extends OmitType(CommentEntity, ['commentId', 'createdAt', 'updatedAt']) {}
