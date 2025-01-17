import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@ObjectType('CreateTag')
@InputType('CreateTagInput')
export class CreateTagDto {
  @Field(() => String)
  @IsString()
  name: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  slug?: string;
}
