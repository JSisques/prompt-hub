import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { CryptoService } from 'src/crypto/crypto.service';
import { UserService } from 'src/user/user.service';
import { UserDto } from 'src/user/dto/user.dto';
import { User } from '@prisma/client';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly userService: UserService,
    private readonly cryptoService: CryptoService,
  ) {}

  @Mutation(() => UserDto)
  async login(@Args('email') email: string, @Args('password') password: string): Promise<User> {
    const user = await this.userService.getUserByEmail(email);
    const isPasswordValid = await this.cryptoService.comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }
    return user;
  }

  @Mutation(() => UserDto)
  async register(@Args('user') user: CreateUserDto): Promise<User> {
    return this.userService.createUser(user);
  }

  @Mutation(() => UserDto)
  async logout(@Args('id') id: string): Promise<User> {
    return null; // this.userService.logout(id);
  }
}
