import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CryptoService } from 'src/crypto/crypto.service';
import { User } from '@prisma/client';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SessionService } from 'src/session/session.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly cryptoService: CryptoService,
    private readonly sessionService: SessionService,
  ) {}

  async login(email: string, password: string): Promise<User> {
    const user = await this.userService.getUserByEmail(email);
    const isPasswordValid = await this.cryptoService.comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    // Registramos la sesión
    await this.sessionService.createSession(user.id);

    return user;
  }

  async register(user: CreateUserDto): Promise<User> {
    user.password = await this.cryptoService.hashPassword(user.password);
    return this.userService.createUser(user);
  }

  async logout(id: string): Promise<User> {
    return null; // this.userService.logout(id);
  }
}
