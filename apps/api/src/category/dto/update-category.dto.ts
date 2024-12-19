import { IsString, IsNotEmpty } from 'class-validator';
import { InputType, Field, ObjectType } from '@nestjs/graphql';

@ObjectType('UpdateCategory')
@InputType('UpdateCategoryInput')
export class UpdateCategoryDto {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  description: string;
}
