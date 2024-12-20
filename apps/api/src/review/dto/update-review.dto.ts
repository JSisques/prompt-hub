import { IsString, IsNotEmpty, IsInt } from 'class-validator';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@ObjectType('UpdateReview')
@InputType('UpdateReviewInput')
export class UpdateReviewDto {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  comment: string;

  @Field(() => Int)
  @IsInt()
  @IsNotEmpty()
  rating: number;
}
