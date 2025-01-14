import { Injectable, Logger } from '@nestjs/common';
import { Tag } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTagDto } from './dto/create-tag.dto';

@Injectable()
export class TagsService {
  private readonly logger: Logger;
  constructor(private readonly prisma: PrismaService) {
    this.logger = new Logger(TagsService.name);
  }

  async getTags(): Promise<Tag[]> {
    this.logger.log('Entering getTags()');
    return this.prisma.tag.findMany();
  }

  async getTagById(id: string): Promise<Tag> {
    this.logger.log(`Entering getTagById(${id})`);
    return this.prisma.tag.findUnique({ where: { id } });
  }

  async createOrGetTag(tagData: { name: string }): Promise<Tag> {
    this.logger.log(`Entering createOrGetTag(${JSON.stringify(tagData)})`);
    return this.prisma.tag.upsert({
      where: { name: tagData.name },
      update: {},
      create: {
        name: tagData.name,
        slug: tagData.name.toLowerCase().replace(/\s+/g, '-'),
      },
    });
  }

  async createTag(data: CreateTagDto): Promise<Tag> {
    this.logger.log('Entering createTag()');
    return this.prisma.tag.create({ data: { ...data, slug: data.name.toLowerCase().replace(/\s+/g, '-') } });
  }

  async updateTag(id: string, data: CreateTagDto): Promise<Tag> {
    this.logger.log(`Entering updateTag(${id})`);
    return this.prisma.tag.update({ where: { id }, data });
  }

  async deleteTag(id: string): Promise<Tag> {
    this.logger.log(`Entering deleteTag(${id})`);
    return this.prisma.tag.delete({ where: { id } });
  }
}
