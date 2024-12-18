import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@ObjectType('Session')
@InputType('SessionInput')
export class SessionDto {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  id?: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  userId: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  token: string;

  @Field({ nullable: true })
  @IsOptional()
  loginAt?: Date;

  @Field({ nullable: true })
  @IsOptional()
  logoutAt?: Date;

  @Field({ nullable: true })
  @IsOptional()
  createdAt?: Date;

  @Field({ nullable: true })
  @IsOptional()
  updatedAt?: Date;
}
