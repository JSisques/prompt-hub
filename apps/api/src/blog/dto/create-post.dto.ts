import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

@InputType('CreatePostInput')
export class CreatePostInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  title: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  excerpt: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  content: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  coverImage: string;

  @Field()
  @IsUUID()
  @IsNotEmpty()
  categoryId: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsUUID('4', { each: true })
  tagIds?: string[];

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  published?: boolean;
}
