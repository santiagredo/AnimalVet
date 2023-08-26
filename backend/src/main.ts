import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes';
import * as express from 'express';
import * as path from 'path';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe());
    const staticFilePath = '../../frontend/dist';
    app.use(express.static(path.join(__dirname, staticFilePath)));
    await app.listen(3000);
}
bootstrap();
