import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UserDto } from 'src/user/dto/user.dto';
import { User } from '@prisma/client';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Logger } from '@nestjs/common';

@Resolver()
export class AuthResolver {
  private logger: Logger;

  constructor(private readonly authService: AuthService) {
    this.logger = new Logger(AuthResolver.name);
  }

  @Mutation(() => UserDto)
  async login(@Args('email') email: string, @Args('password') password: string): Promise<User> {
    this.logger.log(`Entering login(email: ${email}, password: ${password})`);
    return this.authService.login(email.trim(), password);
  }

  @Mutation(() => UserDto)
  async register(@Args('input') user: CreateUserDto): Promise<User> {
    this.logger.log(`Entering register(user: ${JSON.stringify(user)})`);
    const trimmedUser = {
      ...user,
      email: user.email.trim(),
      username: user.username.trim(),
    };
    return this.authService.register(trimmedUser);
  }

  @Mutation(() => UserDto)
  async logout(@Args('id') id: string): Promise<User> {
    this.logger.log(`Entering logout(id: ${id})`);
    return null; // this.userService.logout(id);
  }
}
