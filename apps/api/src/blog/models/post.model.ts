import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/models/user.model';
import { Category } from '../../categories/models/category.model';
import { Tag } from '../../tags/models/tag.model';
import { Comment } from './comment.model';

@ObjectType()
export class Post {
  @Field(() => ID)
  id: string;

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

  @Field(() => Int)
  views: number;

  @Field()
  published: boolean;

  @Field(() => User)
  user: User;

  @Field()
  userId: string;

  @Field(() => Category)
  category: Category;

  @Field()
  categoryId: string;

  @Field(() => [Tag])
  tags: Tag[];

  @Field(() => [Comment])
  comments: Comment[];

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
