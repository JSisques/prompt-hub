import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { ConfigModule } from '@nestjs/config';
import { CryptoService } from 'src/crypto/crypto.service';
import { AuthService } from './auth.service';
import { SessionModule } from 'src/session/session.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule, ConfigModule, SessionModule, UserModule],
  providers: [AuthResolver, UserService, CryptoService, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
