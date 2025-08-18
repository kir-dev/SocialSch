import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';
import { Exclude } from 'class-transformer';
import { Post } from '../../generated/prisma/client/client';

export class Like {
  @ApiProperty({ description: 'Unique identifier for the like' })
  likeId: number;

  @ApiProperty({ description: 'ID of the user who created the like' })
  userId: string;

  @ApiProperty({ description: 'User who created the like' })
  @Exclude({ toPlainOnly: true })
  user?: User;

  @ApiProperty({ description: 'ID of the post that was liked' })
  postId: number;

  @ApiProperty({ description: 'Post that was liked' })
  @Exclude({ toPlainOnly: true })
  post?: Post;
}
