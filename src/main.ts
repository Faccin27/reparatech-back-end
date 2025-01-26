import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';


dotenv.config();

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule,{cors:true});
  app.enableCors();
  let port = 7865;
  await app.listen(port);

  logger.warn(`API Running at: http://localhost:${port}`);

}
bootstrap();
