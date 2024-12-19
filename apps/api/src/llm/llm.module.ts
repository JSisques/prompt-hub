import { Module } from '@nestjs/common';
import { LlmResolver } from './llm.resolver';
import { LlmService } from './llm.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [LlmResolver, LlmService],
  exports: [LlmService],
})
export class LlmModule {}
