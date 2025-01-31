import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Review } from '@prisma/client';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  async getReviews(): Promise<Review[]> {
    return this.prisma.review.findMany();
  }

  async getReview(id: string): Promise<Review> {
    return this.prisma.review.findUnique({ where: { id } });
  }

  async createReview(review: CreateReviewDto): Promise<Review> {
    return this.prisma.review.create({
      data: {
        promptId: review.promptId,
        userId: review.userId,
        rating: review.rating,
        content: review.content,
      },
    });
  }

  async updateReview(id: string, review: UpdateReviewDto): Promise<Review> {
    return this.prisma.review.update({ where: { id }, data: review });
  }

  async deleteReview(id: string): Promise<Review> {
    return this.prisma.review.delete({ where: { id } });
  }
}
