import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { GraphQLSchemaBuilderModule, GraphQLSchemaFactory } from '@nestjs/graphql';
import { printSchema } from 'graphql';
import * as fs from 'fs';
import { UserResolver } from './user/user.resolver';
import { ReviewResolver } from './review/review.resolver';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //const gqlSchemaFactory = app.get(GraphQLSchemaFactory);
  //const schema = await gqlSchemaFactory.create([UserResolver, ReviewResolver]);

  //fs.writeFileSync('./schema.gql', printSchema(schema));

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.setGlobalPrefix('api/v1');
  await app.listen(process.env.API_PORT ?? 3000);
}
bootstrap();
