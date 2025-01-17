import { Module } from '@nestjs/common';
import { LikesResolver } from './likes.resolver';
import { LikesService } from './likes.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [LikesResolver, LikesService],
  exports: [LikesService],
})
export class LikesModule {}
