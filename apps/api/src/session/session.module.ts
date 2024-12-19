import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SessionResolver } from './session.resolver';

@Module({
  imports: [PrismaModule],
  providers: [SessionService, SessionResolver],
  exports: [SessionService],
})
export class SessionModule {}
