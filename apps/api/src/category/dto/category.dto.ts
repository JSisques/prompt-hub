import { Field, ObjectType, InputType } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsDate } from 'class-validator';

@ObjectType('CategoryType')
@InputType('CategoryInput')
export class CategoryDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  id: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  description: string;

  @Field()
  @IsDate()
  createdAt: Date;

  @Field()
  @IsDate()
  updatedAt: Date;
}
