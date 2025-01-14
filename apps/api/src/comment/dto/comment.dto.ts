import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
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

  @Field()
  @IsNotEmpty()
  author: UserDto;

  @Field({ nullable: true })
  @IsString()
  promptId?: string;

  @Field({ nullable: true })
  @IsString()
  postId?: string;

  @Field(() => Date)
  @IsNotEmpty()
  createdAt: Date;

  @Field(() => Date)
  @IsNotEmpty()
  updatedAt: Date;
}
