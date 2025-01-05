import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

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
  categoryId: string;

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
  @IsString()
  llmId: string;

  @Field()
  @IsNotEmpty()
  @IsBoolean()
  published: boolean;

  @Field()
  @IsNumber()
  @IsOptional()
  views?: number;

  @Field()
  @IsNotEmpty()
  @IsString()
  prompt: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  example: string;
}
