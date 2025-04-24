import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
//import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findOne(id: string): Promise<User> {
    const user = this.prisma.user.findUnique({
      where: { userId: id },
    });

    if (user === null) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = this.prisma.user.findUnique({
      where: { userId: id },
    });
    if (user === null) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return this.prisma.user.update({ where: { userId: id }, data: { ...updateUserDto } });
  }

  async remove(id: string): Promise<User> {
    try {
      return this.prisma.user.delete({ where: { userId: id } });
    } catch (_error) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }

  // Temporary function to create a user
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (user) {
      throw new BadRequestException('User with this email already exists');
    }

    const randNum = Math.floor(Math.random() * 1000000);

    return this.prisma.user.create({ data: { ...createUserDto, userId: randNum.toString() } });
  }
}
