import { Injectable } from '@nestjs/common';
import { CreateAddedUserDto } from './dto/create-added_user.dto';
import { UpdateAddedUserDto } from './dto/update-added_user.dto';

@Injectable()
export class AddedUserService {
  create(createAddedUserDto: CreateAddedUserDto) {
    return 'This action adds a new addedUser';
  }

  findAll() {
    return `This action returns all addedUser`;
  }

  findOne(id: number) {
    return `This action returns a #${id} addedUser`;
  }

  update(id: number, updateAddedUserDto: UpdateAddedUserDto) {
    return `This action updates a #${id} addedUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} addedUser`;
  }
}
