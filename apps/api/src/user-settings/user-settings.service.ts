import { Injectable, Logger } from '@nestjs/common';
import { UserSettings } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserSettingsDto } from './dto/create-user-settings.dto';
import { UpdateUserSettingsDto } from './dto/update-user-settings.dto';

@Injectable()
export class UserSettingsService {
  private logger: Logger;

  constructor(private readonly prisma: PrismaService) {
    this.logger = new Logger(UserSettingsService.name);
  }

  async getUserSettings(userId: string): Promise<UserSettings[]> {
    this.logger.log(`Entering getUserSettings(userId: ${userId})`);
    return this.prisma.userSettings.findMany();
  }

  async getUserSettingsById(id: string): Promise<UserSettings> {
    this.logger.log(`Entering getUserSettingsById(id: ${id})`);
    return this.prisma.userSettings.findUnique({ where: { id } });
  }

  async getUserSettingsByUserId(userId: string): Promise<UserSettings> {
    this.logger.log(`Entering getUserSettingsByUserId(userId: ${userId})`);
    return this.prisma.userSettings.findUnique({ where: { userId } });
  }

  async createUserSettings(userSettings: CreateUserSettingsDto): Promise<UserSettings> {
    this.logger.log(`Entering createUserSettings(userSettings: ${userSettings})`);
    return this.prisma.userSettings.create({ data: userSettings });
  }

  async updateUserSettings(id: string, userSettings: UpdateUserSettingsDto): Promise<UserSettings> {
    this.logger.log(`Entering updateUserSettings(id: ${id}, userSettings: ${userSettings})`);
    return this.prisma.userSettings.update({ where: { id }, data: userSettings });
  }

  async deleteUserSettings(id: string): Promise<UserSettings> {
    this.logger.log(`Entering deleteUserSettings(id: ${id})`);
    return this.prisma.userSettings.delete({ where: { id } });
  }
}
