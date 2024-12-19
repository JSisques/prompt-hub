import { Logger } from '@nestjs/common';
import { PromptService } from './prompt.service';
import { Prompt } from '@prisma/client';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { PromptDto } from './dto/prompt.dto';
import { CreatePromptDto } from './dto/create-prompt.dto';
import { UpdatePromptDto } from './dto/update-prompt.dto';

@Resolver()
export class PromptResolver {
  private logger: Logger;
  constructor(private readonly promptService: PromptService) {
    this.logger = new Logger('PromptResolver');
  }

  @Query(() => [PromptDto])
  async getPrompts(): Promise<Prompt[]> {
    this.logger.log('Entering getPrompts()');
    return this.promptService.getPrompts();
  }

  @Query(() => PromptDto)
  async getPromptById(@Args('id') id: string): Promise<Prompt> {
    this.logger.log(`Entering getPromptById(id: ${id})`);
    return this.promptService.getPromptById(id);
  }

  @Mutation(() => PromptDto)
  async createPrompt(@Args('prompt') prompt: CreatePromptDto): Promise<Prompt> {
    this.logger.log(`Entering createPrompt(prompt: ${JSON.stringify(prompt)})`);
    return this.promptService.createPrompt(prompt);
  }

  @Mutation(() => PromptDto)
  async updatePrompt(@Args('id') id: string, @Args('prompt') prompt: UpdatePromptDto): Promise<Prompt> {
    this.logger.log(`Entering updatePrompt(id: ${id}, prompt: ${JSON.stringify(prompt)})`);
    return this.promptService.updatePrompt(id, prompt);
  }

  @Mutation(() => PromptDto)
  async deletePrompt(@Args('id') id: string): Promise<Prompt> {
    this.logger.log(`Entering deletePrompt(id: ${id})`);
    return this.promptService.deletePrompt(id);
  }
}
