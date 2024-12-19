import { Field, ObjectType } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

import { IsString } from 'class-validator';

@ObjectType('CreateLlmOutput')
@InputType('CreateLlmInput')
export class CreateLlmDto {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  description: string;
}
