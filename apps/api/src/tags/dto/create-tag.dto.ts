import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsDate, IsOptional, IsString, IsUUID } from 'class-validator';

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
