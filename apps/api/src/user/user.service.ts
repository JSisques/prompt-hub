import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from 'src/user/dto/user.dto';
import { CryptoService } from 'src/crypto/crypto.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private cryptoService: CryptoService,
  ) {}

  async getUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async getUser(id: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async createUser(user: CreateUserDto): Promise<User> {
    user.password = await this.cryptoService.hashPassword(user.password);
    return this.prisma.user.create({ data: user });
  }

  async updateUser(id: string, user: UpdateUserDto): Promise<User> {
    return this.prisma.user.update({ where: { id }, data: user });
  }

  async deleteUser(id: string): Promise<User> {
    return this.prisma.user.delete({ where: { id } });
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { email } });
  }
}
