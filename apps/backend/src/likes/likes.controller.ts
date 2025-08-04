import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { Like } from './entities/like.entity';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post()
  create(@Body() createLikeDto: CreateLikeDto): Promise<Like> {
    return this.likesService.create(createLikeDto);
  }

  @Get()
  findAll(): Promise<Like[]> {
    return this.likesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Like> {
    return this.likesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLikeDto: UpdateLikeDto): Promise<Like> {
    return this.likesService.update(+id, updateLikeDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<void> {
    return this.likesService.remove(+id);
  }

  @Post('toggle')
  toggleLike(@Body() data: { userId: string; postId: number }): Promise<{ liked: boolean; count: number }> {
    return this.likesService.toggleLike(data.userId, data.postId);
  }

  @Get('count/:postId')
  getLikeCount(@Param('postId') postId: string): Promise<number> {
    return this.likesService.getLikeCount(+postId);
  }
}
