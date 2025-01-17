import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { LikeDto } from './dto/like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';

@Injectable()
export class LikesService {
  private readonly logger;
  constructor(private readonly prisma: PrismaService) {
    this.logger = new Logger(LikesService.name);
  }

  async getLikes(userId: string): Promise<LikeDto[]> {
    this.logger.log(`Entering getLikes(userId: ${userId})`);
    return this.prisma.like.findMany({ where: { userId } });
  }

  async getLikeById(id: string): Promise<LikeDto> {
    this.logger.log(`Entering getLike(id: ${id})`);
    return this.prisma.like.findUnique({ where: { id } });
  }

  async getLikesByUserId(userId: string): Promise<LikeDto[]> {
    this.logger.log(`Entering getLikesByUserId(userId: ${userId})`);
    return this.prisma.like.findMany({ where: { userId } });
  }

  async getLikesByPromptId(promptId: string): Promise<LikeDto[]> {
    this.logger.log(`Entering getLikesByPromptId(promptId: ${promptId})`);
    return this.prisma.like.findMany({ where: { promptId } });
  }

  async getLikesByReviewId(reviewId: string): Promise<LikeDto[]> {
    this.logger.log(`Entering getLikesByReviewId(reviewId: ${reviewId})`);
    return this.prisma.like.findMany({ where: { reviewId } });
  }

  async createLike(data: CreateLikeDto): Promise<LikeDto> {
    this.logger.log(`Entering createLike(data: ${JSON.stringify(data)})`);
    return this.prisma.like.create({
      data: {
        user: {
          connect: { id: data.userId },
        },
        prompt: {
          connect: data.promptId ? { id: data.promptId } : undefined,
        },
        review: {
          connect: data.reviewId ? { id: data.reviewId } : undefined,
        },
        comment: {
          connect: data.commentId ? { id: data.commentId } : undefined,
        },
      },
    });
  }

  async updateLike(id: string, data: UpdateLikeDto): Promise<LikeDto> {
    this.logger.log(`Entering updateLike(id: ${id}, data: ${JSON.stringify(data)})`);
    return this.prisma.like.update({ where: { id }, data });
  }

  async deleteLike(id: string): Promise<LikeDto> {
    this.logger.log(`Entering deleteLike(id: ${id})`);
    return this.prisma.like.delete({ where: { id } });
  }
}
