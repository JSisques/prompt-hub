import { Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async getCategories(): Promise<Category[]> {
    return this.prisma.category.findMany();
  }

  async getCategoryById(id: string): Promise<Category | null> {
    return this.prisma.category.findUnique({ where: { id } });
  }

  async createCategory(data: Category): Promise<Category> {
    return this.prisma.category.create({ data });
  }

  async updateCategory(id: string, data: Category): Promise<Category> {
    return this.prisma.category.update({ where: { id }, data });
  }

  async deleteCategory(id: string): Promise<Category> {
    return this.prisma.category.delete({ where: { id } });
  }
}
