import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // to protect all endpoints from receiving incorrect data

  app.enableCors({
    origin: 'http://localhost:3001', // allow frontend
    credentials: true,               // allow cookies if needed
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
