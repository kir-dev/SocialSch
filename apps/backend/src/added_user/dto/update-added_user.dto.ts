import { PartialType } from '@nestjs/swagger';
import { CreateAddedUserDto } from './create-added_user.dto';

export class UpdateAddedUserDto extends PartialType(CreateAddedUserDto) {}
