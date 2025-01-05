import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserSettingsService } from './user-settings.service';
import { UserSettingsDto } from './dto/user-settings.dto';
import { UpdateUserSettingsDto } from './dto/update-user-settings.dto';
import { CreateUserSettingsDto } from './dto/create-user-settings.dto';

@Resolver()
export class UserSettingsResolver {
  constructor(private readonly userSettingsService: UserSettingsService) {}

  @Query(() => UserSettingsDto)
  async getUserSettings(@Args('userId') userId: string): Promise<UserSettingsDto[]> {
    return this.userSettingsService.getUserSettings(userId);
  }

  @Query(() => UserSettingsDto)
  async getUserSettingsById(@Args('id') id: string): Promise<UserSettingsDto> {
    return this.userSettingsService.getUserSettingsById(id);
  }

  @Mutation(() => UserSettingsDto)
  async createUserSettings(@Args('createUserSettingsInput') createUserSettingsInput: CreateUserSettingsDto): Promise<UserSettingsDto> {
    return this.userSettingsService.createUserSettings(createUserSettingsInput);
  }

  @Mutation(() => UserSettingsDto)
  async updateUserSettings(
    @Args('id') id: string,
    @Args('updateUserSettingsInput') updateUserSettingsInput: UpdateUserSettingsDto,
  ): Promise<UserSettingsDto> {
    return this.userSettingsService.updateUserSettings(id, updateUserSettingsInput);
  }

  @Mutation(() => UserSettingsDto)
  async deleteUserSettings(@Args('id') id: string): Promise<UserSettingsDto> {
    return this.userSettingsService.deleteUserSettings(id);
  }
}
