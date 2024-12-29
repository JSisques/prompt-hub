import { ObjectType } from '@nestjs/graphql';

import { Field } from '@nestjs/graphql';
import { UserDto } from 'src/user/dto/user.dto';

@ObjectType('AuthResponse')
export class AuthResponseDto {
  @Field(() => UserDto)
  user: UserDto;

  @Field()
  token: string;
}
