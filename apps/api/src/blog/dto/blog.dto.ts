import { ObjectType } from '@nestjs/graphql';
import { IsString, IsNotEmpty } from 'class-validator';

@ObjectType('BlogPostDto')
export class BlogPostDto {
  @IsString()
  @IsNotEmpty()
  title: string;
}
