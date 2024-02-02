import { Module } from '@nestjs/common';
import { CustomLogger } from './service/custom-logger.service';
import { LoggerService } from './service/logger.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [CustomLogger, LoggerService],
  exports: [CustomLogger],
})
export class LoggerModule {}
