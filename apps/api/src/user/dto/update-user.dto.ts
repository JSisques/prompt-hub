import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

@ObjectType('UpdateUser')
@InputType('UpdateUserInput')
export class UpdateUserDto {
  @Field()
  @IsOptional()
  @IsString()
  username?: string;

  @Field()
  @IsOptional()
  @IsString()
  name?: string;

  @Field()
  @IsOptional()
  @IsString()
  bio?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  avatar?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
