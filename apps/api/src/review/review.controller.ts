import { Controller, Get, Param, Post, Put, Delete, Body } from '@nestjs/common';
import { ReviewService } from './review.service';
import { Review } from '@prisma/client';
import { ReviewDto } from 'src/common/dto/review.dto';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  getReviews(): Promise<Review[]> {
    return this.reviewService.getReviews();
  }

  @Get(':id')
  getReview(@Param('id') id: string): Promise<Review> {
    return this.reviewService.getReview(id);
  }

  @Post()
  createReview(@Body() review: Review): Promise<Review> {
    return this.reviewService.createReview(review);
  }

  @Put(':id')
  updateReview(@Param('id') id: string, @Body() review: Review): Promise<Review> {
    return this.reviewService.updateReview(id, review);
  }

  @Delete(':id')
  deleteReview(@Param('id') id: string): Promise<Review> {
    return this.reviewService.deleteReview(id);
  }
}
