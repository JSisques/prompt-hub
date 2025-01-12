import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString, IsBoolean } from 'class-validator';

@ObjectType('CreateUserSettings')
@InputType('CreateUserSettingsInput')
export class CreateUserSettingsDto {
  @Field()
  @IsString()
  userId: string;

  @Field()
  @IsString()
  language: string;

  @Field()
  @IsString()
  theme: string;

  @Field()
  @IsBoolean()
  notifyNewPrompts: boolean;

  @Field()
  @IsBoolean()
  notifyNewComments: boolean;

  @Field()
  @IsBoolean()
  notifyNewLikes: boolean;

  @Field()
  @IsBoolean()
  notifyNewReviews: boolean;

  @Field()
  @IsBoolean()
  notifyMarketingEmail: boolean;
}
