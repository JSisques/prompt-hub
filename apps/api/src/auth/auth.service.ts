import { Injectable, Logger } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CryptoService } from 'src/crypto/crypto.service';
import { User } from '@prisma/client';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  private logger: Logger;

  constructor(
    private readonly userService: UserService,
    private readonly cryptoService: CryptoService,
  ) {
    this.logger = new Logger(AuthService.name);
  }

  async login(email: string, password: string): Promise<User> {
    this.logger.log(`Entering login(email: ${email})`);

    const user = await this.userService.getUserByEmail(email);
    const isPasswordValid = await this.cryptoService.comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

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
