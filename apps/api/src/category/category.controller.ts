import { Controller, Get, Param, Post, Put, Delete, Body } from '@nestjs/common';
import { Category } from '@prisma/client';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getCategories(): Promise<Category[]> {
    return this.categoryService.getCategories();
  }

  @Get(':id')
  getCategoryById(@Param('id') id: string): Promise<Category | null> {
    return this.categoryService.getCategoryById(id);
  }

  @Post()
  createCategory(@Body() category: Category): Promise<Category> {
    return this.categoryService.createCategory(category);
  }

  @Put(':id')
  updateCategory(@Param('id') id: string, @Body() category: Category): Promise<Category> {
    return this.categoryService.updateCategory(id, category);
  }

  @Delete(':id')
  deleteCategory(@Param('id') id: string): Promise<Category> {
    return this.categoryService.deleteCategory(id);
  }
}
