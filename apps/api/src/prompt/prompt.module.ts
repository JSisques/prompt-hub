import { Module } from '@nestjs/common';
import { PromptService } from './prompt.service';
import { PromptResolver } from './prompt.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TagsModule } from '../tags/tags.module';
import { CategoryModule } from '../category/category.module';
import { LlmModule } from '../llm/llm.module';
import { IAModule } from 'src/ia/ia.module';

@Module({
  imports: [PrismaModule, IAModule, TagsModule, CategoryModule, LlmModule],
  providers: [PromptService, PromptResolver],
  exports: [PromptService],
})
export class PromptModule {}
