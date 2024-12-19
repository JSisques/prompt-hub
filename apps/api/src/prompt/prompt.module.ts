import { Module } from '@nestjs/common';
import { PromptService } from './prompt.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PromptResolver } from './prompt.resolver';

@Module({
  imports: [PrismaModule],
  providers: [PromptResolver, PromptService],
  exports: [PromptService],
})
export class PromptModule {}
