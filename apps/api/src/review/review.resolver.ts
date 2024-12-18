import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { ReviewService } from './review.service';
import { Review } from '@prisma/client';
import { ReviewDto } from './dto/review.dto';

@Resolver()
export class ReviewResolver {
  constructor(private readonly reviewService: ReviewService) {}

  @Query(() => [ReviewDto])
  getReviews(): Promise<Review[]> {
    return this.reviewService.getReviews();
  }

  @Query(() => ReviewDto)
  getReview(@Args('id') id: string): Promise<Review> {
    return this.reviewService.getReview(id);
  }

  @Mutation(() => ReviewDto)
  createReview(@Args('review') review: ReviewDto): Promise<Review> {
    return this.reviewService.createReview(review);
  }

  @Mutation(() => ReviewDto)
  updateReview(@Args('id') id: string, @Args('review') review: ReviewDto): Promise<Review> {
    return this.reviewService.updateReview(id, review);
  }

  @Mutation(() => ReviewDto)
  deleteReview(@Args('id') id: string): Promise<Review> {
    return this.reviewService.deleteReview(id);
  }
}
