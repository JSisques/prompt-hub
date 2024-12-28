import { Field, ObjectType, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { CategoryDto } from 'src/category/dto/category.dto';
import { CommentDto } from 'src/comment/dto/comment.dto';
import { LlmDto } from 'src/llm/dto/llm.dto';
import { ReviewDto } from 'src/review/dto/review.dto';
import { UserDto } from 'src/user/dto/user.dto';

@ObjectType('Prompt')
@InputType('PromptInput')
export class PromptDto {
  @Field(() => String)
  @IsNotEmpty()
  id: string;

  @Field(() => UserDto)
  @IsNotEmpty()
  author: UserDto;

  @Field(() => CategoryDto)
  @IsNotEmpty()
  category: CategoryDto;

  @Field(() => String)
  @IsNotEmpty()
  title: string;

  @Field(() => String)
  @IsNotEmpty()
  content: string;

  @Field(() => [String])
  @IsNotEmpty()
  tags: string[];

  @Field(() => [String])
  @IsNotEmpty()
  likes: string[];

  @Field(() => [CommentDto])
  @IsNotEmpty()
  comments: CommentDto[];

  @Field(() => LlmDto)
  @IsNotEmpty()
  llm: LlmDto;

  @Field(() => [ReviewDto], { nullable: true })
  reviews?: ReviewDto[];

  @Field(() => Date)
  @IsNotEmpty()
  createdAt: Date;

  @Field(() => Date)
  @IsNotEmpty()
  updatedAt: Date;
}
