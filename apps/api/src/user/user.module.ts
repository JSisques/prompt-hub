import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserController } from './user.controller';
import { UserResolver } from './user.resolver';
import { CryptoModule } from 'src/crypto/crypto.module';

@Module({
  imports: [PrismaModule, CryptoModule],
  controllers: [UserController],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
