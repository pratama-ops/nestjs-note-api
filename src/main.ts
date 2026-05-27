import 'dotenv/config'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //setup swagger (dokumentasi API yang interaktif - bisa dicoba tanpa perlu postman)
  const config = new DocumentBuilder()
    .setTitle('Notes API')
    .setDescription('API untuk manage notes')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  //validationpipe = melakukan pengecekan data
  //useglobalpipes = pasang validationpipe ke seluruh aplikasi sekaligus
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
