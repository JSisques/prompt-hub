import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsUUID, IsString, IsBoolean } from 'class-validator';

@ObjectType('UserSettings')
@InputType('UserSettingsInput')
export class UserSettingsDto {
  @Field()
  @IsUUID()
  id: string;

  @Field()
  @IsUUID()
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
