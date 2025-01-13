import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateTagDto } from 'src/tags/dto/create-tag.dto';

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

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  categoryName?: string;

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

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  llmName?: string;

  @Field()
  @IsNotEmpty()
  @IsBoolean()
  published: boolean;

  @Field()
  @IsNotEmpty()
  @IsString()
  example: string;

  @Field(() => [CreateTagDto], { nullable: true })
  tags?: CreateTagDto[];
}
