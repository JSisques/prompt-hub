import { Module } from '@nestjs/common';
import { UserSettingsResolver } from './user-settings.resolver';
import { UserSettingsService } from './user-settings.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [UserSettingsResolver, UserSettingsService],
})
export class UserSettingsModule {}
