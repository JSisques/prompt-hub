import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserDto } from '../common/dto/user/user.dto';
import { CreateUserDto } from '../common/dto/user/create-user.dto';
import { UserService } from './user.service';
import { User } from '@prisma/client';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserDto])
  getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Query(() => UserDto)
  getUser(@Args('id') id: string): Promise<User> {
    return this.userService.getUser(id);
  }

  @Mutation(() => CreateUserDto)
  createUser(@Args('user') user: CreateUserDto): Promise<User> {
    return this.userService.createUser(user);
  }

  @Mutation(() => UserDto)
  updateUser(@Args('id') id: string, @Args('user') user: UserDto): Promise<User> {
    return this.userService.updateUser(id, user);
  }

  @Mutation(() => UserDto)
  deleteUser(@Args('id') id: string): Promise<User> {
    return this.userService.deleteUser(id);
  }
}
