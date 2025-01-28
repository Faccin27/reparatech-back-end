import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

import { createServer, proxy } from 'aws-serverless-express';
import { Context, Handler } from 'aws-lambda';

const expressApp = express();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });
  await app.init();
}

bootstrap();

const server = createServer(expressApp);

export const handler: Handler = (event: any, context: Context) => {
  return proxy(server, event, context);
};
