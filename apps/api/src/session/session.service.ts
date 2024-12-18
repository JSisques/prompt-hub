import { Injectable } from '@nestjs/common';
import { Session } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSessionDto } from './dto/create-session.dto';

@Injectable()
export class SessionService {
  constructor(private readonly prisma: PrismaService) {}

  async createSession(userId: string): Promise<Session> {
    return this.prisma.session.create({
      data: {
        userId: userId,
        loginAt: new Date(),
        logoutAt: null,
      },
    });
  }

  async getSessionsByUserId(userId: string): Promise<Session[]> {
    return this.prisma.session.findMany({
      where: { userId },
    });
  }

  async deleteSession(id: string): Promise<Session> {
    return this.prisma.session.delete({
      where: { id },
    });
  }
}
