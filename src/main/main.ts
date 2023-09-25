import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule);
  await app.listen();
}
bootstrap()
  .then(() => {
    Logger.log(`Current environment mode: ${process.env.NODE_ENV}`);
  })
  .catch((error) => {
    Logger.error(error);
  });
