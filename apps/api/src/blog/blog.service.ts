import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostInput } from './dto/create-post.dto';
import { UpdatePostInput } from './dto/update-post.dto';
import slugify from 'slugify';
import { Prisma } from '@prisma/client';

@Injectable()
export class BlogService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createPostInput: CreatePostInput) {
    const { tagIds, categoryId, ...data } = createPostInput;

    const slug = slugify(data.title, { lower: true, strict: true });

    return this.prisma.post.create({
      data: {
        ...data,
        slug,
        userId,
        categoryId,
        tags: tagIds
          ? {
              create: tagIds.map(tagId => ({
                tagId,
              })),
            }
          : undefined,
      },
      include: {
        user: true,
        category: true,
        tags: {
          include: {
            tag: true,
          },
        },
        comments: {
          include: {
            user: true,
          },
        },
        likes: true,
      },
    });
  }

  async findAll(options: { skip?: number; take?: number; published?: boolean; categoryId?: string; tagId?: string; searchQuery?: string }) {
    const { skip = 0, take = 10, published, categoryId, tagId, searchQuery } = options;

    const where: Prisma.PostWhereInput = {
      published,
      categoryId,
      tags: tagId
        ? {
            some: {
              tagId,
            },
          }
        : undefined,
      OR: searchQuery
        ? [
            { title: { contains: searchQuery, mode: 'insensitive' } },
            { excerpt: { contains: searchQuery, mode: 'insensitive' } },
            { content: { contains: searchQuery, mode: 'insensitive' } },
          ]
        : undefined,
    };

    const [posts, total] = await Promise.all([
      this.prisma.post.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        include: {
          user: true,
          category: true,
          tags: {
            include: {
              tag: true,
            },
          },
          _count: {
            select: {
              comments: true,
              likes: true,
            },
          },
        },
      }),
      this.prisma.post.count({ where }),
    ]);

    return {
      posts,
      total,
    };
  }

  async findOne(id: string) {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: {
        user: true,
        category: true,
        tags: {
          include: {
            tag: true,
          },
        },
        comments: {
          include: {
            user: true,
          },
        },
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    // Incrementar vistas
    await this.prisma.post.update({
      where: { id },
      data: { views: { increment: 1 } },
    });

    return post;
  }

  async findBySlug(slug: string) {
    const post = await this.prisma.post.findUnique({
      where: { slug },
      include: {
        user: true,
        category: true,
        tags: {
          include: {
            tag: true,
          },
        },
        comments: {
          include: {
            user: true,
          },
        },
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
    });

    if (!post) {
      throw new NotFoundException(`Post with slug ${slug} not found`);
    }

    // Incrementar vistas
    await this.prisma.post.update({
      where: { id: post.id },
      data: { views: { increment: 1 } },
    });

    return post;
  }

  async update(id: string, userId: string, updatePostInput: UpdatePostInput) {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    if (post.userId !== userId) {
      throw new Error('You are not authorized to update this post');
    }

    const { tagIds, categoryId, ...data } = updatePostInput;

    // Si el título cambia, actualizar el slug
    const slug = data.title ? slugify(data.title, { lower: true, strict: true }) : undefined;

    return this.prisma.post.update({
      where: { id },
      data: {
        ...data,
        slug,
        categoryId,
        tags: tagIds
          ? {
              deleteMany: {},
              create: tagIds.map(tagId => ({
                tagId,
              })),
            }
          : undefined,
      },
      include: {
        user: true,
        category: true,
        tags: {
          include: {
            tag: true,
          },
        },
        comments: {
          include: {
            user: true,
          },
        },
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
    });
  }

  async remove(id: string, userId: string) {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    if (post.userId !== userId) {
      throw new Error('You are not authorized to delete this post');
    }

    await this.prisma.post.delete({
      where: { id },
    });

    return true;
  }

  async like(postId: string, userId: string) {
    const post = await this.prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }

    const existingLike = await this.prisma.like.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    if (existingLike) {
      await this.prisma.like.delete({
        where: {
          userId_postId: {
            userId,
            postId,
          },
        },
      });
      return false;
    }

    await this.prisma.like.create({
      data: {
        userId,
        postId,
      },
    });

    return true;
  }

  async addComment(postId: string, userId: string, content: string) {
    const post = await this.prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }

    return this.prisma.comment.create({
      data: {
        content,
        userId,
        postId,
      },
      include: {
        user: true,
      },
    });
  }
}
