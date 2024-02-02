import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as requestIp from 'request-ip';
import { SwaggerTheme } from 'swagger-themes';
import { AppModule } from './modules/app.module';
import { CustomLogger } from './modules/logger/service/custom-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(CustomLogger));
  app.use(requestIp.mw());
  const configService = app.get(ConfigService);
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  });
  const theme = new SwaggerTheme('v3');
  const config = new DocumentBuilder()
    .setTitle('To Do List')
    .setDescription('A backend for to do list using Prisma and NestJS.')
    .setVersion('1.0.0')
    .addTag('')
    // .addBearerAuth(
    //   { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
    //   AuthorizationHeader.BEARER,
    // )
    // .addBasicAuth(
    //   {
    //     type: 'apiKey',
    //     in: 'header',
    //     name: 'Authorization',
    //   },
    //   AuthorizationHeader.BASIC,
    // )
    .build();
  const options = {
    customCss: theme.getBuffer('dark'),
  };
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, options);

  const port = configService.get<number>('app.port');
  await app.listen(port);
  Logger.log(`🚀 Server is up and running on port ${port}`, 'Bootstrap');
}
bootstrap();
