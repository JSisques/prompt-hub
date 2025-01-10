import { Injectable, Logger } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CryptoService } from 'src/crypto/crypto.service';
import { User } from '@prisma/client';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

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

    this.logger.log(`User found: ${JSON.stringify(user)}`);

    const isPasswordValid = await this.cryptoService.comparePassword(password, user.password);

    if (!isPasswordValid) {
      this.logger.error('Invalid password');
      throw new Error('Invalid password');
    }

    return user;
  }

  async register(user: CreateUserDto): Promise<User> {
    this.logger.log(`Entering register(user: ${JSON.stringify(user)})`);

    const existingUserByEmail = await this.userService.getUserByEmail(user.email);
    if (existingUserByEmail) {
      this.logger.error(`User with email ${user.email} already exists`);
      throw new Error('El email ya está registrado');
    }

    const existingUserByUsername = await this.userService.getUserByUsername(user.username);
    if (existingUserByUsername) {
      this.logger.error(`User with username ${user.username} already exists`);
      throw new Error('El nombre de usuario ya está en uso');
    }

    return this.userService.createUser(user);
  }

  async logout(id: string): Promise<User> {
    return null; // this.userService.logout(id);
  }
}
