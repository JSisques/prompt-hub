import { Injectable, Logger } from '@nestjs/common';
import { Llm } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLlmDto } from './dto/create-llm.dto';
import { UpdateLlmDto } from './dto/update-llm.dto';

@Injectable()
export class LlmService {
  private logger: Logger;
  constructor(private readonly prisma: PrismaService) {
    this.logger = new Logger(LlmService.name);
  }

  async getLlms(): Promise<Llm[]> {
    this.logger.log('Entering getLlms()');
    return this.prisma.llm.findMany();
  }

  async getLlmById(id: string): Promise<Llm> {
    this.logger.log(`Entering getLlmById(id: ${id})`);
    return this.prisma.llm.findUnique({ where: { id } });
  }

  async createOrGetLlm(data: CreateLlmDto): Promise<Llm> {
    this.logger.log(`Entering createOrGetLlm(data: ${JSON.stringify(data)})`);
    return this.prisma.llm.upsert({
      where: { name: data.name },
      update: {},
      create: data,
    });
  }

  async createLlm(data: CreateLlmDto): Promise<Llm> {
    this.logger.log(`Entering createLlm(data: ${JSON.stringify(data)})`);
    return this.createOrGetLlm(data);
  }

  async updateLlm(id: string, data: UpdateLlmDto): Promise<Llm> {
    this.logger.log(`Entering updateLlm(id: ${id}, data: ${JSON.stringify(data)})`);
    return this.prisma.llm.update({ where: { id }, data });
  }

  async deleteLlm(id: string): Promise<Llm> {
    this.logger.log(`Entering deleteLlm(id: ${id})`);
    return this.prisma.llm.delete({ where: { id } });
  }
}
