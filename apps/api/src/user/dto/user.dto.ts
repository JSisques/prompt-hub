import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserSettingsDto } from 'src/user-settings/dto/user-settings.dto';

@ObjectType('UserType')
@InputType('UserInput')
export class UserDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  id: string;

  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  username: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  avatar: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  bio: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  userSettings: UserSettingsDto;

  @Field({ nullable: true, defaultValue: true })
  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  createdAt?: Date;

  @Field({ nullable: true })
  @IsOptional()
  updatedAt?: Date;
}
