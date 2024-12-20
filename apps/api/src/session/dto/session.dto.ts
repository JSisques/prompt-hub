import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserDto } from 'src/user/dto/user.dto';

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

  @Field({ nullable: true })
  @IsOptional()
  loginAt?: Date;

  @Field({ nullable: true })
  @IsOptional()
  createdAt?: Date;

  @Field({ nullable: true })
  @IsOptional()
  updatedAt?: Date;
}
