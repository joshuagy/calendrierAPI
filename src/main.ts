import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from "dotenv";


async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule, { 
    cors: true, 
    logger: ['error', 'warn', 'log', 'debug', 'verbose']
  });
  app.enableCors();
  await app.listen(3000, "0.0.0.0");
}

bootstrap();