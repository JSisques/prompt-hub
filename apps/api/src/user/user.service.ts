import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDto } from '../common/dto/user/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from 'src/common/dto/user/user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async getUser(id: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async createUser(user: CreateUserDto): Promise<User> {
    return this.prisma.user.create({ data: user });
  }

  async updateUser(id: string, user: UserDto): Promise<User> {
    return this.prisma.user.update({ where: { id }, data: user });
  }

  async deleteUser(id: string): Promise<User> {
    return this.prisma.user.delete({ where: { id } });
  }
}
