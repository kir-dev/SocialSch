import { AuthSchProfile } from '@kir-dev/passport-authsch';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  login(user: User): string {
    return this.jwtService.sign(user, {
      secret: process.env.JWT_SECRET,
      expiresIn: '2 days',
    });
  }

  async findOrCreateUser(userProfile: AuthSchProfile): Promise<User> {
    let user = await this.prisma.user.findUnique({
      where: { authSchId: userProfile.authSchId },
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          authSchId: userProfile.authSchId,
          email: userProfile.email,
          username: userProfile.fullName,
          /// TODO: Save neptun as well if available
        },
      });
    }

    return user;
  }
}
