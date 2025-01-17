import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommentDto } from './dto/comment.dto';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Logger } from '@nestjs/common';
@Resolver()
export class CommentResolver {
  private readonly logger;
  constructor(private readonly commentService: CommentService) {
    this.logger = new Logger(CommentResolver.name);
  }

  @Query(() => [CommentDto])
  async getComments() {
    this.logger.log('Getting all comments');
    return this.commentService.getComments();
  }

  @Query(() => [CommentDto])
  async getCommentsByPromptId(@Args('promptId') promptId: string) {
    this.logger.log(`Getting comments for prompt ${promptId}`);
    return this.commentService.getCommentsByPromptId(promptId);
  }

  @Mutation(() => CommentDto)
  async createComment(@Args('input') input: CreateCommentDto) {
    this.logger.log(`Creating comment for prompt ${input.promptId}`);
    return this.commentService.createComment(input);
  }

  @Mutation(() => CommentDto)
  async updateComment(@Args('id') id: string, @Args('content') content: string) {
    this.logger.log(`Updating comment ${id}`);
    return this.commentService.updateComment(id, content);
  }

  @Mutation(() => CommentDto)
  async deleteComment(@Args('id') id: string) {
    this.logger.log(`Deleting comment ${id}`);
    return this.commentService.deleteComment(id);
  }
}
