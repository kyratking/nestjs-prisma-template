import { MiddlewareConsumer, Module } from '@nestjs/common';
import { HTTPLoggerMiddleware } from 'src/middleware/http-logger.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { LoggerModule } from './logger/logger.module';
import { MailerModule } from './mailer/mailer.module';
import { MediaModule } from './media/media.module';

@Module({
  imports: [ConfigModule, LoggerModule, MailerModule, MediaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HTTPLoggerMiddleware).forRoutes('*');
  }
}
