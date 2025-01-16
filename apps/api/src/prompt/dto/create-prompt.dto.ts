import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

@ObjectType('CreatePromptOutput')
@InputType('CreatePromptInput')
export class CreatePromptDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  userId: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  title: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  description: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  content: string;

  @Field()
  @IsNotEmpty()
  @IsBoolean()
  published: boolean;

  @Field()
  @IsNotEmpty()
  @IsString()
  example: string;
}
