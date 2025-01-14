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
    this.logger = new Logger(PromptResolver.name);
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

  @Query(() => [PromptDto])
  async getPromptsByName(@Args('name') name: string): Promise<Prompt[]> {
    this.logger.log(`Entering getPromptsByName(name: ${name})`);
    return this.promptService.getPromptsByName(name);
  }

  @Mutation(() => PromptDto)
  async createPrompt(@Args('input') input: CreatePromptDto): Promise<Prompt> {
    this.logger.log(`Entering createPrompt(input: ${JSON.stringify(input)})`);
    return this.promptService.createPrompt(input);
  }

  @Mutation(() => PromptDto)
  async updatePrompt(@Args('id') id: string, @Args('input') input: UpdatePromptDto): Promise<Prompt> {
    this.logger.log(`Entering updatePrompt(id: ${id}, input: ${JSON.stringify(input)})`);
    return this.promptService.updatePrompt(id, input);
  }

  @Mutation(() => PromptDto)
  async deletePrompt(@Args('id') id: string): Promise<Prompt> {
    this.logger.log(`Entering deletePrompt(id: ${id})`);
    return this.promptService.deletePrompt(id);
  }
}
