import { Injectable, NotFoundException } from '@nestjs/common';
//import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'nestjs-prisma';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findOne(id: string): Promise<User> {
    const user = this.prisma.user.findUnique({
      where: { authSchId: id },
    });

    if (user === null) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = this.prisma.user.findUnique({
      where: { authSchId: id },
    });
    if (user === null) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return this.prisma.user.update({ where: { authSchId: id }, data: { ...updateUserDto } });
  }

  async remove(id: string): Promise<User> {
    try {
      return this.prisma.user.delete({ where: { authSchId: id } });
    } catch (_error) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }
}
