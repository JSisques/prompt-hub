import { Injectable, Logger } from '@nestjs/common';
import { Prompt } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePromptDto } from './dto/create-prompt.dto';
import { UpdatePromptDto } from './dto/update-prompt.dto';
import { TagsService } from '../tags/tags.service';
import { CategoryService } from '../category/category.service';
import { LlmService } from '../llm/llm.service';
import { IAService } from '../ia/ia.service';

@Injectable()
export class PromptService {
  private logger: Logger;
  constructor(
    private readonly prisma: PrismaService,
    private readonly tagsService: TagsService,
    private readonly categoryService: CategoryService,
    private readonly llmService: LlmService,
    private readonly iaService: IAService,
  ) {
    this.logger = new Logger(PromptService.name);
  }

  private async generateSlug(title: string): Promise<string> {
    return title.toLowerCase().replace(/\s+/g, '-');
  }

  async getPrompts(): Promise<Prompt[]> {
    this.logger.log('Entering getPrompts()');
    return this.prisma.prompt.findMany({
      include: {
        category: true,
        llm: true,
        user: true,
        comments: { include: { user: true } },
        tags: true,
        reviews: { include: { user: true } },
        likes: true,
      },
    });
  }

  async getPromptById(id: string): Promise<Prompt | null> {
    this.logger.log(`Entering getPromptById(id: ${id})`);
    return this.prisma.prompt.findUnique({
      where: { id },
      include: {
        category: true,
        llm: true,
        user: true,
        comments: { include: { user: true } },
        tags: true,
        reviews: { include: { user: true } },
        likes: true,
      },
    });
  }

  async getPromptsByName(name: string): Promise<Prompt[]> {
    this.logger.log(`Entering getPromptsByName(name: ${name})`);
    return this.prisma.prompt.findMany({
      where: { title: { contains: name } },
      include: {
        category: true,
        llm: true,
        user: true,
        comments: { include: { user: true } },
        tags: true,
        reviews: { include: { user: true } },
        likes: true,
      },
    });
  }

  async createPrompt(data: CreatePromptDto): Promise<Prompt> {
    this.logger.log(`Entering createPrompt(data: ${JSON.stringify(data)})`);
    const { userId, ...promptData } = data;

    // Analizar el prompt con IA
    const analysis = await this.iaService.analyzePrompt(promptData.content);
    if (!analysis.success) {
      throw new Error(`No se pudo analizar el prompt con IA: ${analysis.error}`);
    }

    // Crear o obtener la categoría basada en el análisis de IA
    const category = await this.categoryService.createOrGetCategory({
      name: analysis.data.category,
      description: `Categoría generada automáticamente por IA para ${analysis.data.category}`,
    });

    // Crear o obtener el LLM principal recomendado
    const recommendedLlm = analysis.data.llm; // Tomamos el primer LLM recomendado
    const llm = await this.llmService.createOrGetLlm({
      name: recommendedLlm,
      description: `LLM recomendado por IA para este prompt`,
    });

    return this.prisma.prompt.create({
      data: {
        ...promptData,
        slug: await this.generateSlug(promptData.title),
        content: promptData.content,
        user: { connect: { id: userId } },
        category: { connect: { id: category.id } },
        llm: { connect: { id: llm.id } },
        tags: {
          connectOrCreate: analysis.data.tags.map(tagName => ({
            where: { name: tagName },
            create: {
              name: tagName,
              slug: tagName.toLowerCase().replace(/\s+/g, '-'),
            },
          })),
        },
      },
      include: {
        category: true,
        llm: true,
        user: true,
        tags: true,
        comments: { include: { user: true } },
        reviews: { include: { user: true } },
        likes: true,
      },
    });
  }

  async updatePrompt(id: string, data: UpdatePromptDto): Promise<Prompt> {
    this.logger.log(`Entering updatePrompt(id: ${id}, data: ${JSON.stringify(data)})`);
    return this.prisma.prompt.update({
      where: { id },
      data,
      include: {
        category: true,
        llm: true,
        user: true,
        comments: { include: { user: true } },
        tags: true,
        reviews: { include: { user: true } },
        likes: true,
      },
    });
  }

  async deletePrompt(id: string): Promise<Prompt> {
    this.logger.log(`Entering deletePrompt(id: ${id})`);
    return this.prisma.prompt.delete({
      where: { id },
      include: {
        category: true,
        llm: true,
        user: true,
        comments: { include: { user: true } },
        tags: true,
        reviews: { include: { user: true } },
        likes: true,
      },
    });
  }
}
