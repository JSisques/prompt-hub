import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentService {
  private readonly logger;
  constructor(private readonly prisma: PrismaService) {
    this.logger = new Logger(CommentService.name);
  }

  async getComments() {
    this.logger.log('Getting all comments');
    return this.prisma.comment.findMany({
      include: { user: true },
    });
  }

  async getCommentsByPromptId(promptId: string) {
    this.logger.log(`Getting comments for prompt ${promptId}`);
    return this.prisma.comment.findMany({
      where: { promptId },
      include: { user: true },
    });
  }

  async createComment(input: CreateCommentDto) {
    this.logger.log(`Creating comment for prompt ${input.promptId} by user ${input.userId}`);
    return this.prisma.comment.create({
      data: {
        content: input.content,
        prompt: {
          connect: { id: input.promptId },
        },
        user: {
          connect: { id: input.userId },
        },
      },
      include: { user: true },
    });
  }

  async updateComment(id: string, content: string) {
    this.logger.log(`Updating comment ${id}`);
    return this.prisma.comment.update({
      where: { id },
      data: { content },
      include: { user: true },
    });
  }

  async deleteComment(id: string) {
    this.logger.log(`Deleting comment ${id}`);
    return this.prisma.comment.delete({ where: { id }, include: { user: true } });
  }
}
