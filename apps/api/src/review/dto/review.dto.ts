import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';
import { CommentDto } from '../../comment/dto/comment.dto';

@ObjectType('Review')
@InputType('ReviewInput')
export class ReviewDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  id: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  comment: string;

  @Field()
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @Field()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  likes: number;

  @Field(() => [CommentDto], { nullable: true })
  comments?: CommentDto[];

  @Field()
  @IsNotEmpty()
  @IsString()
  userId: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  promptId: string;

  @Field()
  @IsNotEmpty()
  createdAt: Date;

  @Field()
  @IsNotEmpty()
  updatedAt: Date;
}
