import { Logger } from '@nestjs/common';
import { LlmService } from './llm.service';
import { LlmDto } from './dto/llm.dto';
import { Llm } from '@prisma/client';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateLlmDto } from './dto/create-llm.dto';
import { UpdateLlmDto } from './dto/update-llm.dto';

@Resolver()
export class LlmResolver {
  private logger: Logger;
  constructor(private readonly llmService: LlmService) {
    this.logger = new Logger(LlmResolver.name);
  }

  @Query(() => [LlmDto])
  async getLlms(): Promise<Llm[]> {
    this.logger.log('Entering getLlms()');
    return this.llmService.getLlms();
  }

  @Query(() => LlmDto)
  async getLlmById(@Args('id') id: string): Promise<Llm> {
    this.logger.log(`Entering getLlmById(id: ${id})`);
    return this.llmService.getLlmById(id);
  }

  @Mutation(() => LlmDto)
  async createLlm(@Args('llm') llm: CreateLlmDto): Promise<Llm> {
    this.logger.log(`Entering createLlm(llm: ${JSON.stringify(llm)})`);
    return this.llmService.createLlm(llm);
  }

  @Mutation(() => LlmDto)
  async updateLlm(@Args('id') id: string, @Args('llm') llm: UpdateLlmDto): Promise<Llm> {
    this.logger.log(`Entering updateLlm(id: ${id}, llm: ${JSON.stringify(llm)})`);
    return this.llmService.updateLlm(id, llm);
  }

  @Mutation(() => LlmDto)
  async deleteLlm(@Args('id') id: string): Promise<Llm> {
    this.logger.log(`Entering deleteLlm(id: ${id})`);
    return this.llmService.deleteLlm(id);
  }
}
