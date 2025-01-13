import { Injectable, Logger } from '@nestjs/common';
import { Prompt } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePromptDto } from './dto/create-prompt.dto';
import { UpdatePromptDto } from './dto/update-prompt.dto';
import { TagsService } from '../tags/tags.service';
import { CategoryService } from '../category/category.service';
import { LlmService } from '../llm/llm.service';

@Injectable()
export class PromptService {
  private logger: Logger;
  constructor(
    private readonly prisma: PrismaService,
    private readonly tagsService: TagsService,
    private readonly categoryService: CategoryService,
    private readonly llmService: LlmService,
  ) {
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
    const { tags, userId, categoryId, categoryName, llmId, llmName, ...promptData } = data;

    // Manejar la categoría
    let finalCategoryId = categoryId;
    if (categoryName && !categoryId) {
      const category = await this.categoryService.createCategory({
        name: categoryName,
        description: `Categoría generada automáticamente para ${categoryName}`,
      });
      finalCategoryId = category.id;
    }

    // Manejar el LLM
    let finalLlmId = llmId;
    if (llmName && !llmId) {
      const llm = await this.llmService.createLlm({
        name: llmName,
        description: `LLM generado automáticamente para ${llmName}`,
      });
      finalLlmId = llm.id;
    }

    // Crear o encontrar los tags existentes usando TagsService
    const tagConnections = await Promise.all(
      tags.map(async tagData => {
        const existingTag = await this.tagsService.createOrGetTag({ name: tagData.name });
        return { tagId: existingTag.id };
      }),
    );

    return this.prisma.prompt.create({
      data: {
        ...promptData,
        slug: promptData.title.toLowerCase().replace(/\s+/g, '-'),
        content: promptData.content,
        user: { connect: { id: userId } },
        category: { connect: { id: finalCategoryId } },
        llm: { connect: { id: finalLlmId } },
        tags: {
          create: tagConnections,
        },
      },
      include: {
        category: true,
        llm: true,
        user: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
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
