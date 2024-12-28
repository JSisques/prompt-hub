import { Injectable, Logger } from '@nestjs/common';
import { Prompt } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePromptDto } from './dto/create-prompt.dto';
import { UpdatePromptDto } from './dto/update-prompt.dto';

@Injectable()
export class PromptService {
  private logger: Logger;
  constructor(private readonly prisma: PrismaService) {
    this.logger = new Logger(PromptService.name);
  }

  async getPrompts(): Promise<Prompt[]> {
    this.logger.log('Entering getPrompts()');
    return this.prisma.prompt.findMany({
      include: {
        category: true,
        llm: true,
        user: true,
        comments: true,
      },
    });
  }

  async getPromptById(id: string): Promise<Prompt | null> {
    this.logger.log(`Entering getPromptById(id: ${id})`);
    return this.prisma.prompt.findUnique({ where: { id } });
  }

  async createPrompt(data: CreatePromptDto): Promise<Prompt> {
    this.logger.log(`Entering createPrompt(data: ${JSON.stringify(data)})`);
    return this.prisma.prompt.create({
      data,
    });
  }

  async updatePrompt(id: string, data: UpdatePromptDto): Promise<Prompt> {
    this.logger.log(`Entering updatePrompt(id: ${id}, data: ${JSON.stringify(data)})`);
    return this.prisma.prompt.update({ where: { id }, data });
  }

  async deletePrompt(id: string): Promise<Prompt> {
    this.logger.log(`Entering deletePrompt(id: ${id})`);
    return this.prisma.prompt.delete({ where: { id } });
  }
}
