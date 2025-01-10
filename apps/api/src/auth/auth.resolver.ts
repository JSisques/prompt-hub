import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UserDto } from 'src/user/dto/user.dto';
import { User } from '@prisma/client';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => UserDto)
  async login(@Args('email') email: string, @Args('password') password: string): Promise<User> {
    return this.authService.login(email.trim(), password);
  }

  @Mutation(() => UserDto)
  async register(@Args('input') user: CreateUserDto): Promise<User> {
    const trimmedUser = {
      ...user,
      email: user.email.trim(),
      username: user.username.trim(),
    };
    return this.authService.register(trimmedUser);
  }

  @Mutation(() => UserDto)
  async logout(@Args('id') id: string): Promise<User> {
    return null; // this.userService.logout(id);
  }
}
