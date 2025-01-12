import { Test, TestingModule } from '@nestjs/testing';
import { UserSettingsResolver } from './user-settings.resolver';

describe('UserSettingsResolver', () => {
  let resolver: UserSettingsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserSettingsResolver],
    }).compile();

    resolver = module.get<UserSettingsResolver>(UserSettingsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
