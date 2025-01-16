import { Injectable, Logger } from '@nestjs/common';
import { Category } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import slugify from 'slugify';

@Injectable()
export class CategoryService {
  private logger: Logger;

  constructor(private readonly prisma: PrismaService) {
    this.logger = new Logger(CategoryService.name);
  }

  async getCategories(): Promise<Category[]> {
    this.logger.log('Entering getCategories()');
    return this.prisma.category.findMany();
  }

  async getCategoryById(id: string): Promise<Category | null> {
    this.logger.log(`Entering getCategoryById(id: ${id})`);
    return this.prisma.category.findUnique({ where: { id } });
  }

  async createOrGetCategory(data: CreateCategoryDto): Promise<Category> {
    this.logger.log(`Entering createOrGetCategory(data: ${JSON.stringify(data)})`);
    const slug = slugify(data.name, { lower: true });
    return this.prisma.category.upsert({
      where: { name: data.name },
      update: {},
      create: { ...data, slug },
    });
  }

  async createCategory(data: CreateCategoryDto): Promise<Category> {
    this.logger.log(`Entering createCategory(data: ${JSON.stringify(data)})`);
    return this.createOrGetCategory(data);
  }

  async updateCategory(id: string, data: UpdateCategoryDto): Promise<Category> {
    this.logger.log(`Entering updateCategory(id: ${id}, data: ${JSON.stringify(data)})`);
    return this.prisma.category.update({ where: { id }, data });
  }

  async deleteCategory(id: string): Promise<Category> {
    this.logger.log(`Entering deleteCategory(id: ${id})`);
    return this.prisma.category.delete({ where: { id } });
  }
}
