import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserDto } from 'src/user/dto/user.dto';

@ObjectType('CommentType')
@InputType('CommentInput')
export class CommentDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  id: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  content: string;

  @Field(() => UserDto)
  @IsNotEmpty()
  user: UserDto;

  @Field()
  @IsNotEmpty()
  @IsString()
  promptId: string;

  @Field(() => Date)
  @IsNotEmpty()
  createdAt: Date;

  @Field(() => Date)
  @IsNotEmpty()
  updatedAt: Date;
}
