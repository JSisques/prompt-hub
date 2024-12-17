import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';

@Module({})
export class CategoryModule {
  imports: [PrismaModule];
  controllers: [CategoryController];
  providers: [CategoryService];
}
