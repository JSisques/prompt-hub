import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { CryptoService } from 'src/crypto/crypto.service';
import { UserService } from 'src/user/user.service';
import { UserDto } from 'src/user/dto/user.dto';
import { User } from '@prisma/client';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => UserDto)
  async login(@Args('email') email: string, @Args('password') password: string): Promise<User> {
    return this.authService.login(email, password);
  }

  @Mutation(() => UserDto)
  async register(@Args('user') user: CreateUserDto): Promise<User> {
    return this.authService.register(user);
  }

  @Mutation(() => UserDto)
  async logout(@Args('id') id: string): Promise<User> {
    return null; // this.userService.logout(id);
  }
}
