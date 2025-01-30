import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

import { createServer, proxy } from 'aws-serverless-express';
import { Context, Handler } from 'aws-lambda';

const expressApp = express();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  await app.listen(7865);
}

bootstrap();
