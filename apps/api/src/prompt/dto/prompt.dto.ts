import { Field, ObjectType, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { CategoryDto } from 'src/category/dto/category.dto';
import { CommentDto } from 'src/comment/dto/comment.dto';
import { LikeDto } from 'src/likes/dto/like.dto';
import { LlmDto } from 'src/llm/dto/llm.dto';
import { ReviewDto } from 'src/review/dto/review.dto';
import { TagDto } from 'src/tags/dto/tag.dto';
import { UserDto } from 'src/user/dto/user.dto';

@ObjectType('Prompt')
@InputType('PromptInput')
export class PromptDto {
  @Field(() => String)
  @IsNotEmpty()
  id: string;

  @Field(() => UserDto)
  @IsNotEmpty()
  user: UserDto;

  @Field(() => CategoryDto)
  @IsNotEmpty()
  category: CategoryDto;

  @Field(() => String)
  @IsNotEmpty()
  description: string;

  @Field(() => String)
  @IsNotEmpty()
  prompt: string;

  @Field(() => String)
  @IsNotEmpty()
  example: string;

  @Field(() => Boolean)
  @IsNotEmpty()
  published: boolean;

  @Field(() => String)
  @IsNotEmpty()
  title: string;

  @Field(() => String)
  @IsNotEmpty()
  slug: string;

  @Field(() => String)
  @IsNotEmpty()
  content: string;

  @Field(() => [TagDto])
  @IsNotEmpty()
  tags: TagDto[];

  @Field(() => [LikeDto], { nullable: true })
  likes?: LikeDto[];

  @Field(() => [CommentDto], { nullable: true })
  comments?: CommentDto[];

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
