import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { PromptService } from './prompt.service';
import { Prompt } from '@prisma/client';

@Controller('prompt')
export class PromptController {
  constructor(private readonly promptService: PromptService) {}

  @Get()
  getPrompts(): Promise<Prompt[]> {
    return this.promptService.getPrompts();
  }

  @Get(':id')
  getPromptById(@Param('id') id: string): Promise<Prompt | null> {
    return this.promptService.getPromptById(id);
  }

  @Post()
  createPrompt(@Body() prompt: Prompt): Promise<Prompt> {
    return this.promptService.createPrompt(prompt);
  }

  @Put(':id')
  updatePrompt(@Param('id') id: string, @Body() prompt: Prompt): Promise<Prompt> {
    return this.promptService.updatePrompt(id, prompt);
  }

  @Delete(':id')
  deletePrompt(@Param('id') id: string): Promise<Prompt> {
    return this.promptService.deletePrompt(id);
  }
}
