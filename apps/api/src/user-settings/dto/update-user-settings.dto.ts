import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString, IsBoolean } from 'class-validator';

@ObjectType('UpdateUserSettingsInput')
@InputType('UpdateUserSettingsInput')
export class UpdateUserSettingsDto {
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
