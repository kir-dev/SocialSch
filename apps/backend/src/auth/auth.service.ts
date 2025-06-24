import { AuthSchProfile } from '@kir-dev/passport-authsch';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'nestjs-prisma';
import { User } from 'src/users/entities/user.entity';

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
      where: { userId: userProfile.authSchId },
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          userId: userProfile.authSchId,
          email: userProfile.email,
          userName: userProfile.fullName,
          /// TODO: Save neptun as well if available
        },
      });
    }

    return user;
  }
}
