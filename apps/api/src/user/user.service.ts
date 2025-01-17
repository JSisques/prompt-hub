import { Injectable, Logger } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CryptoService } from 'src/crypto/crypto.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private logger: Logger;

  constructor(
    private prisma: PrismaService,
    private cryptoService: CryptoService,
  ) {
    this.logger = new Logger(UserService.name);
  }

  async getUsers(): Promise<User[]> {
    this.logger.log('Entering getUsers()');
    return this.prisma.user.findMany({ include: { settings: true } });
  }

  async getUser(id: string): Promise<User> {
    this.logger.log(`Entering getUser(id: ${id})`);
    return this.prisma.user.findUnique({
      where: { id },
      include: { settings: true },
    });
  }

  async createUser(user: CreateUserDto): Promise<User> {
    this.logger.log(`Entering createUser(user: ${JSON.stringify(user)})`);

    try {
      user.password = await this.cryptoService.hashPassword(user.password);
      this.logger.debug(`Hashed password: ${user.password}`);
      return this.prisma.user.create({
        data: {
          ...user,
          email: user.email.toLowerCase().trim(),
          username: user.username.toLowerCase().trim(),
          avatar: 'https://ui.shadcn.com/avatars/shadcn.jpg',
          settings: {
            create: {},
          },
        },
        include: { settings: true },
      });
    } catch (error) {
      this.logger.error(`Error creating user: ${error}`);
      throw error;
    }
  }

  async updateUser(id: string, user: UpdateUserDto): Promise<User> {
    this.logger.log(`Entering updateUser(id: ${id}, user: ${JSON.stringify(user)})`);
    return this.prisma.user.update({
      where: { id },
      data: {
        ...user,
        username: user.username.toLowerCase().trim(),
      },
      include: { settings: true },
    });
  }

  async deleteUser(id: string): Promise<User> {
    this.logger.log(`Entering deleteUser(id: ${id})`);
    return this.prisma.user.delete({
      where: { id },
      include: { settings: true },
    });
  }

  async getUserByEmail(email: string): Promise<User> {
    this.logger.log(`Entering getUserByEmail(email: ${email})`);
    return this.prisma.user.findUnique({
      where: { email },
      include: { settings: true },
    });
  }

  async getUserByUsername(username: string): Promise<User> {
    this.logger.log(`Entering getUserByUsername(username: ${username})`);
    return this.prisma.user.findUnique({
      where: { username },
      include: { settings: true },
    });
  }
}
