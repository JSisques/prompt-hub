import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { PromptModule } from './prompt/prompt.module';
import { PromptService } from './prompt/prompt.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { CategoryService } from './category/category.service';
import { ReviewModule } from './review/review.module';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { ReviewService } from './review/review.service';
import { join } from 'path';
import { CryptoModule } from './crypto/crypto.module';
import { CryptoService } from './crypto/crypto.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { SessionModule } from './session/session.module';
import { LlmModule } from './llm/llm.module';
import { HealthModule } from './health/health.module';
import { CommentModule } from './comment/comment.module';
import { BlogModule } from './blog/blog.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      sortSchema: true,
      playground: true,
    }),
    PrismaModule,
    PromptModule,
    CategoryModule,
    ReviewModule,
    UserModule,
    CryptoModule,
    AuthModule,
    SessionModule,
    LlmModule,
    HealthModule,
    CommentModule,
    BlogModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, CategoryService, PromptService, UserService, ReviewService, CryptoService],
})
export class AppModule {}
