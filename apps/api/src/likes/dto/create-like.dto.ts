import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType('CreateLikeOutput')
@InputType('CreateLikeInput')
export class CreateLikeDto {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  userId: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  promptId?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  reviewId?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  commentId?: string;
}
