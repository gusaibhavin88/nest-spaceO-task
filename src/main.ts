import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';
const logger = new Logger('App');
import * as bodyParser from 'body-parser';
import { setupSwagger } from 'utility/config/swagger.config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = (await NestFactory.create(AppModule)) as NestExpressApplication;

  const basePath = `/api/v${process.env.API_VERSION}`;
  app.setGlobalPrefix(basePath);

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.useStaticAssets(path.join(__dirname, '..', 'public'));
  app.enableCors();

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  setupSwagger(app);

  // Apply the global WebSocket exception filter

  await app.listen(process.env.PORT || 3000);
  logger.log(`Application is running on: ${await app.getUrl()}`);
  console.log(
    `Server started at port http://localhost:${process.env.PORT}${basePath}`,
  );
}
bootstrap();
