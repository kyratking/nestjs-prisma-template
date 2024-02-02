import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import appConfig from './loaders/app.config';
import awsConfig from './loaders/aws.config';
import smtpConfig from './loaders/smtp.config';
import { schema } from './schema/schema';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      validate: schema.parse,
      load: [appConfig, awsConfig, smtpConfig],
    }),
  ],
})
export class ConfigModule {}
