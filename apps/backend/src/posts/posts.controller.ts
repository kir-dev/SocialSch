import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './entities/post.entity';
import { PostWithAuthANdCommentDto } from './dto/postwith-auth-comment.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto): Promise<PostEntity> {
    return this.postsService.create(createPostDto);
  }

  @Get()
  findAll(): Promise<PostEntity[]> {
    return this.postsService.findAll();
  }

  @Get('all')
  findAllWithEveryDetail(): Promise<PostWithAuthANdCommentDto[]> {
    return this.postsService.getPostWithEveryDetail();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<PostEntity> {
    return this.postsService.findOne(+id);
  }

  @Get('/author/:id')
  findPostByAuthorId(@Param('id') id: string): Promise<PostEntity[]> {
    return this.postsService.findPostsByAuthorId(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto): Promise<PostEntity> {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<PostEntity> {
    return this.postsService.remove(+id);
  }
}
