import { Injectable } from '@nestjs/common';
import { Session } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSessionDto } from './dto/create-session.dto';

@Injectable()
export class SessionService {
  constructor(private readonly prisma: PrismaService) {}

  async getSessions(): Promise<Session[]> {
    return this.prisma.session.findMany();
  }

  async getSessionsById(id: string): Promise<Session[]> {
    return this.prisma.session.findMany({ where: { id } });
  }

  async getSessionsByUserId(userId: string): Promise<Session[]> {
    return this.prisma.session.findMany({ where: { userId } });
  }

  async createSession(userId: string): Promise<Session> {
    return this.prisma.session.create({ data: { userId } });
  }

  async deleteSession(id: string): Promise<Session> {
    return this.prisma.session.delete({ where: { id } });
  }
}
