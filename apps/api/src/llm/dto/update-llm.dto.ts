import { Field, ObjectType } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

import { IsString } from 'class-validator';

@ObjectType('UpdateLlmOutput')
@InputType('UpdateLlmInput')
export class UpdateLlmDto {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  description: string;
}
