import { Module } from '@nestjs/common';
import { PromptController } from './prompt.controller';
import { PromptService } from './prompt.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({})
export class PromptModule {
  imports: [PrismaModule];
  controllers: [PromptController];
  providers: [PromptService];
}
