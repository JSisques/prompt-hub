import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';

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

  @Query(() => UserDto)
  getUserByEmail(@Args('email') email: string): Promise<User> {
    return this.userService.getUserByEmail(email);
  }

  @Mutation(() => UserDto)
  createUser(@Args('user') user: CreateUserDto): Promise<User> {
    return this.userService.createUser(user);
  }

  @Mutation(() => UserDto)
  updateUser(@Args('id') id: string, @Args('user') user: UpdateUserDto): Promise<User> {
    return this.userService.updateUser(id, user);
  }

  @Mutation(() => UserDto)
  deleteUser(@Args('id') id: string): Promise<User> {
    return this.userService.deleteUser(id);
  }
}
