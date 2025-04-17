import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AddedUserService } from './added_user.service';
import { CreateAddedUserDto } from './dto/create-added_user.dto';
import { UpdateAddedUserDto } from './dto/update-added_user.dto';

@Controller('added-user')
export class AddedUserController {
  constructor(private readonly addedUserService: AddedUserService) {}

  @Post()
  create(@Body() createAddedUserDto: CreateAddedUserDto) {
    return this.addedUserService.create(createAddedUserDto);
  }

  @Get()
  findAll() {
    return this.addedUserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.addedUserService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAddedUserDto: UpdateAddedUserDto) {
    return this.addedUserService.update(+id, updateAddedUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.addedUserService.remove(+id);
  }
}
