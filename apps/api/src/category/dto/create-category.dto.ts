import { IsString, IsNotEmpty } from 'class-validator';
import { InputType, Field, ObjectType } from '@nestjs/graphql';

@ObjectType('CreateCategory')
@InputType('CreateCategoryInput')
export class CreateCategoryDto {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  description: string;
}
