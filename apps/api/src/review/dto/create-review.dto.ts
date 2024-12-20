import { IsString, IsNotEmpty, IsInt } from 'class-validator';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@ObjectType('CreateReview')
@InputType('CreateReviewInput')
export class CreateReviewDto {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  comment: string;

  @Field(() => Int)
  @IsInt()
  @IsNotEmpty()
  rating: number;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  promptId: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  userId: string;
}
