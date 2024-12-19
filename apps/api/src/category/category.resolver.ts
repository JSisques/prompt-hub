import { Logger } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Category } from '@prisma/client';
import { CategoryDto } from './dto/category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Resolver()
export class CategoryResolver {
  private logger: Logger;

  constructor(private readonly categoryService: CategoryService) {
    this.logger = new Logger('CategoryResolver');
  }

  @Query(() => [CategoryDto])
  async getCategories(): Promise<Category[]> {
    this.logger.log('Entering getCategories()');
    return this.categoryService.getCategories();
  }

  @Query(() => CategoryDto)
  async getCategoryById(@Args('id') id: string): Promise<Category> {
    this.logger.log(`Entering getCategoryById(id: ${id})`);
    return this.categoryService.getCategoryById(id);
  }

  @Mutation(() => CategoryDto)
  async createCategory(@Args('data') data: CreateCategoryDto): Promise<Category> {
    this.logger.log(`Entering createCategory(data: ${JSON.stringify(data)})`);
    return this.categoryService.createCategory(data);
  }

  @Mutation(() => CategoryDto)
  async updateCategory(@Args('id') id: string, @Args('data') data: UpdateCategoryDto): Promise<Category> {
    this.logger.log(`Entering updateCategory(id: ${id}, data: ${JSON.stringify(data)})`);
    return this.categoryService.updateCategory(id, data);
  }

  @Mutation(() => CategoryDto)
  async deleteCategory(@Args('id') id: string): Promise<Category> {
    this.logger.log(`Entering deleteCategory(id: ${id})`);
    return this.categoryService.deleteCategory(id);
  }
}
