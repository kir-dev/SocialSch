import { CurrentUser } from '@kir-dev/passport-authsch';
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentEntity } from './entities/comment.entity';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDto): Promise<CommentEntity> {
    return this.commentsService.create(createCommentDto);
  }

  @Get()
  @UseGuards()
  findAll(): Promise<CommentEntity[]> {
    return this.commentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<CommentEntity> {
    return this.commentsService.findOne(+id);
  }

  @Get('/author/:id')
  findCommentsByAuthorId(@Param('id') id: string): Promise<CommentEntity[]> {
    return this.commentsService.findCommentsByAuthorId(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
    @CurrentUser() user: User
  ): Promise<CommentEntity> {
    return this.commentsService.update(+id, updateCommentDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<CommentEntity> {
    return this.commentsService.remove(+id);
  }
}
