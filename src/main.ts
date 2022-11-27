import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DBService } from './db.service';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const dbService: DBService = app.get(DBService);
  dbService.enableShutdownHooks(app);
  const config = new DocumentBuilder()
    .setTitle('Median')
    .setDescription('The Median API Description')
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
