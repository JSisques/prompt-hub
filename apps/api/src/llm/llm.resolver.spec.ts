import { Test, TestingModule } from '@nestjs/testing';
import { LlmResolver } from './llm.resolver';

describe('LlmResolver', () => {
  let resolver: LlmResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LlmResolver],
    }).compile();

    resolver = module.get<LlmResolver>(LlmResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
