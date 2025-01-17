import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { Field, ObjectType, InputType } from '@nestjs/graphql';

@ObjectType('Like')
@InputType('LikeInput')
export class LikeDto {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  id: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  userId: string;

  @Field(() => String, { nullable: true })
  @IsString()
  promptId?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  reviewId?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  commentId?: string;

  @Field(() => Date)
  @IsNotEmpty()
  @IsDate()
  createdAt: Date;

  @Field(() => Date)
  @IsNotEmpty()
  @IsDate()
  updatedAt: Date;
}
