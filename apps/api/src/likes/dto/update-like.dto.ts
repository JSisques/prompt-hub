import { IsString } from 'class-validator';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType('UpdateLikeOutput')
@InputType('UpdateLikeInput')
export class UpdateLikeDto {
  @Field(() => String, { nullable: true })
  @IsString()
  promptId?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  reviewId?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  commentId?: string;
}
