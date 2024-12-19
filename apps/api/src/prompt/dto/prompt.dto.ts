import { Field, ObjectType, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ObjectType('Prompt')
@InputType('PromptInput')
export class PromptDto {
  @Field(() => String)
  @IsNotEmpty()
  id: string;

  @Field(() => String)
  @IsNotEmpty()
  userId: string;

  @Field(() => String)
  @IsNotEmpty()
  categoryId: string;

  @Field(() => String)
  @IsNotEmpty()
  title: string;

  @Field(() => String)
  @IsNotEmpty()
  content: string;

  @Field(() => String)
  @IsNotEmpty()
  llmId: string;

  @Field(() => Date)
  @IsNotEmpty()
  createdAt: Date;

  @Field(() => Date)
  @IsNotEmpty()
  updatedAt: Date;
}
