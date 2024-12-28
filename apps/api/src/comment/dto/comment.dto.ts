import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@ObjectType('CommentType')
@InputType('CommentInput')
export class CommentDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  content: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  userId: string;

  @Field({ nullable: true })
  @IsString()
  promptId?: string;

  @Field({ nullable: true })
  @IsString()
  postId?: string;
}
