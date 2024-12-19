import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

@ObjectType('Llm')
@InputType('LlmInput')
export class LlmDto {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  id: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  description: string;

  @Field(() => Date)
  @IsDate()
  createdAt: Date;

  @Field(() => Date)
  @IsDate()
  updatedAt: Date;
}
