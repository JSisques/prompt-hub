import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReviewDto } from '../common/dto/review.dto';
import { Review } from '@prisma/client';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  async getReviews(): Promise<Review[]> {
    return this.prisma.review.findMany();
  }

  async getReview(id: string): Promise<Review> {
    return this.prisma.review.findUnique({ where: { id } });
  }

  async createReview(review: ReviewDto): Promise<Review> {
    return this.prisma.review.create({ data: review });
  }

  async updateReview(id: string, review: ReviewDto): Promise<Review> {
    return this.prisma.review.update({ where: { id }, data: review });
  }

  async deleteReview(id: string): Promise<Review> {
    return this.prisma.review.delete({ where: { id } });
  }
}
