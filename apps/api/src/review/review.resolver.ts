import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { ReviewService } from './review.service';
import { Review } from '@prisma/client';
import { ReviewDto } from './dto/review.dto';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Resolver()
export class ReviewResolver {
  constructor(private readonly reviewService: ReviewService) {}

  @Query(() => [ReviewDto])
  getReviews(): Promise<Review[]> {
    return this.reviewService.getReviews();
  }

  @Query(() => ReviewDto)
  getReviewById(@Args('id') id: string): Promise<Review> {
    return this.reviewService.getReview(id);
  }

  @Mutation(() => ReviewDto)
  createReview(@Args('review') review: CreateReviewDto): Promise<Review> {
    return this.reviewService.createReview(review);
  }

  @Mutation(() => ReviewDto)
  updateReview(@Args('id') id: string, @Args('review') review: UpdateReviewDto): Promise<Review> {
    return this.reviewService.updateReview(id, review);
  }

  @Mutation(() => ReviewDto)
  deleteReview(@Args('id') id: string): Promise<Review> {
    return this.reviewService.deleteReview(id);
  }
}
