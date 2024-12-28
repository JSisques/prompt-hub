import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Post } from '../../blog/entities/post.entity';
import { User } from '../../user/entities/user.entity';

@ObjectType()
export class Comment {
  @Field(() => ID)
  id: string;

  @Field()
  content: string;

  @Field(() => User)
  user: User;

  @Field()
  userId: string;

  @Field(() => Post)
  post: Post;

  @Field()
  postId: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
