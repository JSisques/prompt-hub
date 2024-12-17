import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ReviewController } from './review.controller';
import { ReviewResolver } from './review.resolver';

@Module({
  imports: [PrismaModule],
  controllers: [ReviewController],
  providers: [ReviewService, ReviewResolver],
  exports: [ReviewService],
})
export class ReviewModule {}
