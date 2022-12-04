import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from 'prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { prismaModule } from 'prisma/prisma.module';

@Module({
  imports: [AuthModule, prismaModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
