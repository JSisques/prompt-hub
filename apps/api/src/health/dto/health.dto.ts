import { Field, ObjectType } from '@nestjs/graphql';
import { IsBoolean } from 'class-validator';

@ObjectType('Health')
export class HealthDto {
  @Field(() => Boolean)
  @IsBoolean()
  isHealthy: boolean;
}
