import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Comment } from '../../comment/entities/comment.entity';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  avatar?: string;

  @Field(() => [Comment])
  comments: Comment[];

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
