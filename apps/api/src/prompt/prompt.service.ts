import { Injectable } from '@nestjs/common';
import { Prompt } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PromptService {
  constructor(private readonly prisma: PrismaService) {}

  async getPrompts(): Promise<Prompt[]> {
    return this.prisma.prompt.findMany();
  }

  async getPromptById(id: string): Promise<Prompt | null> {
    return this.prisma.prompt.findUnique({ where: { id } });
  }

  async createPrompt(data: Prompt): Promise<Prompt> {
    return this.prisma.prompt.create({ data });
  }

  async updatePrompt(id: string, data: Prompt): Promise<Prompt> {
    return this.prisma.prompt.update({ where: { id }, data });
  }

  async deletePrompt(id: string): Promise<Prompt> {
    return this.prisma.prompt.delete({ where: { id } });
  }
}
