import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsDate, IsString, IsUUID } from 'class-validator';

@ObjectType('Tag')
@InputType('TagInput')
export class TagDto {
  @Field(() => String)
  @IsUUID()
  id: string;

  @Field(() => String)
  @IsString()
  name: string;

  @Field(() => String)
  @IsString()
  slug: string;

  @Field(() => Date)
  @IsDate()
  createdAt: Date;

  @Field(() => Date)
  @IsDate()
  updatedAt: Date;
}
