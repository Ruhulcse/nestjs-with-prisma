import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(payload: AuthDto) {
    const { email, password } = payload;
    const foundUser = await this.prisma.user.findUnique({ where: { email } });
    if (foundUser) {
      throw new BadRequestException('email already exists');
    }
    const hashedPassword = await this.generateHashPassword(password);

    await this.prisma.user.create({
      data: {
        email,
        hashedPassword,
      },
    });
    return { message: 'signup successfully' };
  }

  async signin(payload: AuthDto) {
    const { email, password } = payload;
    const foundUser = await this.prisma.user.findUnique({ where: { email } });
    if (!foundUser) {
      throw new BadRequestException('Wrong Credentail');
    }
    return { message: 'signin successfully' };
  }

  async signout() {
    return { message: 'signout successfully' };
  }

  async generateHashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    return hash;
  }
}
