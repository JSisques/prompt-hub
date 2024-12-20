import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@ObjectType('CreateSession')
@InputType('CreateSessionInput')
export class CreateSessionDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  userId: string;
}
