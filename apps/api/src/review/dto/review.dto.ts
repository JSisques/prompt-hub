import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

@ObjectType('Review')
@InputType('ReviewInput')
export class ReviewDto {
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
  @IsString()
  userId: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  promptId: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  id: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  createdAt: Date;

  @Field()
  @IsNotEmpty()
  @IsString()
  updatedAt: Date;
}
