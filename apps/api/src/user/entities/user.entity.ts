import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Post } from '../../blog/entities/post.entity';
import { Comment } from '../../comments/entities/comment.entity';

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

  @Field(() => [Post])
  posts: Post[];

  @Field(() => [Comment])
  comments: Comment[];

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
