import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { httpsCertificate } from './config/https-certificate';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    httpsOptions: httpsCertificate(),
  });
  app.enableCors();
  app.setGlobalPrefix('api');
  const port = process.env.PORT || 3000;
  await app.listen(port);
  const logger = new Logger();
  logger.log(`Server running on Port:${port}`);
}
bootstrap();
