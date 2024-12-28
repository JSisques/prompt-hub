import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Category } from '../../categories/entities/category.entity';
import { Comment } from '../../comments/entities/comment.entity';
import { Tag } from '../../tags/entities/tag.entity';
import { User } from '../../user/entities/user.entity';

@ObjectType()
export class Post {
  @Field(() => ID)
  id: string;

  @Field(() => User)
  user: User;

  @Field(() => Category)
  category: Category;

  @Field()
  title: string;

  @Field()
  slug: string;

  @Field()
  excerpt: string;

  @Field()
  content: string;

  @Field()
  coverImage: string;

  @Field()
  published: boolean;

  @Field(() => Int)
  views: number;

  @Field(() => Int)
  likesCount: number;

  @Field(() => Int)
  commentsCount: number;

  @Field(() => [Tag])
  tags: Tag[];

  @Field(() => [Comment])
  comments: Comment[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
