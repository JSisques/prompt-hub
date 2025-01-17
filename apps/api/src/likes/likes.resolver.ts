import { Logger } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { LikeDto } from './dto/like.dto';

@Resolver()
export class LikesResolver {
  private readonly logger;
  constructor(private readonly likesService: LikesService) {
    this.logger = new Logger(LikesResolver.name);
  }

  @Query(() => [LikeDto])
  async getLikes(@Args('userId') userId: string): Promise<LikeDto[]> {
    this.logger.log(`Entering getLikes(userId: ${userId})`);
    return this.likesService.getLikes(userId);
  }

  @Query(() => LikeDto)
  async getLikeById(@Args('id') id: string): Promise<LikeDto> {
    this.logger.log(`Entering getLikeById(id: ${id})`);
    return this.likesService.getLikeById(id);
  }

  @Query(() => [LikeDto])
  async getLikesByUserId(@Args('userId') userId: string): Promise<LikeDto[]> {
    this.logger.log(`Entering getLikesByUserId(userId: ${userId})`);
    return this.likesService.getLikesByUserId(userId);
  }

  @Query(() => [LikeDto])
  async getLikesByPromptId(@Args('promptId') promptId: string): Promise<LikeDto[]> {
    this.logger.log(`Entering getLikesByPromptId(promptId: ${promptId})`);
    return this.likesService.getLikesByPromptId(promptId);
  }

  @Query(() => [LikeDto])
  async getLikesByReviewId(@Args('reviewId') reviewId: string): Promise<LikeDto[]> {
    this.logger.log(`Entering getLikesByReviewId(reviewId: ${reviewId})`);
    return this.likesService.getLikesByReviewId(reviewId);
  }

  @Mutation(() => LikeDto)
  async createLike(@Args('input') input: CreateLikeDto): Promise<LikeDto> {
    this.logger.log(`Entering createLike(input: ${JSON.stringify(input)})`);
    return this.likesService.createLike(input);
  }

  @Mutation(() => LikeDto)
  async updateLike(@Args('id') id: string, @Args('input') input: UpdateLikeDto): Promise<LikeDto> {
    this.logger.log(`Entering updateLike(id: ${id}, input: ${JSON.stringify(input)})`);
    return this.likesService.updateLike(id, input);
  }

  @Mutation(() => LikeDto)
  async deleteLike(@Args('id') id: string): Promise<LikeDto> {
    this.logger.log(`Entering deleteLike(id: ${id})`);
    return this.likesService.deleteLike(id);
  }
}
