import { Args, Context, Int, Mutation, ObjectType, Field, Query, Resolver } from '@nestjs/graphql';
import { BlogService } from './blog.service';
import { Post } from './models/post.model';
import { Comment } from './models/comment.model';
import { CreatePostInput } from './dto/create-post.dto';
import { UpdatePostInput } from './dto/update-post.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ObjectType()
class PostsResponse {
  @Field(() => [Post])
  posts: Post[];

  @Field(() => Int)
  total: number;
}

@Resolver(() => Post)
export class BlogResolver {
  constructor(private readonly blogService: BlogService) {}

  @Query(() => PostsResponse)
  async posts(
    @Args('skip', { type: () => Int, nullable: true }) skip?: number,
    @Args('take', { type: () => Int, nullable: true }) take?: number,
    @Args('published', { nullable: true }) published?: boolean,
    @Args('categoryId', { nullable: true }) categoryId?: string,
    @Args('tagId', { nullable: true }) tagId?: string,
    @Args('searchQuery', { nullable: true }) searchQuery?: string,
  ) {
    return this.blogService.findAll({
      skip,
      take,
      published,
      categoryId,
      tagId,
      searchQuery,
    });
  }

  @Query(() => Post)
  async post(@Args('id') id: string) {
    return this.blogService.findOne(id);
  }

  @Query(() => Post)
  async postBySlug(@Args('slug') slug: string) {
    return this.blogService.findBySlug(slug);
  }

  @Mutation(() => Post)
  @UseGuards(JwtAuthGuard)
  async createPost(@Args('input') createPostInput: CreatePostInput, @Context() context: { req: { user: { id: string } } }) {
    return this.blogService.create(context.req.user.id, createPostInput);
  }

  @Mutation(() => Post)
  @UseGuards(JwtAuthGuard)
  async updatePost(@Args('id') id: string, @Args('input') updatePostInput: UpdatePostInput, @Context() context: { req: { user: { id: string } } }) {
    return this.blogService.update(id, context.req.user.id, updatePostInput);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async deletePost(@Args('id') id: string, @Context() context: { req: { user: { id: string } } }) {
    return this.blogService.remove(id, context.req.user.id);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async likePost(@Args('postId') postId: string, @Context() context: { req: { user: { id: string } } }) {
    return this.blogService.like(postId, context.req.user.id);
  }

  @Mutation(() => Comment)
  @UseGuards(JwtAuthGuard)
  async addComment(@Args('postId') postId: string, @Args('content') content: string, @Context() context: { req: { user: { id: string } } }) {
    return this.blogService.addComment(postId, context.req.user.id, content);
  }
}
