import { Module } from '@nestjs/common';
import { AWSModule } from '../aws/aws.module';
import { PrismaModule } from '../prisma/prisma.module';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';

@Module({
  imports: [AWSModule, PrismaModule],
  controllers: [MediaController],
  providers: [MediaService],
  exports: [MediaService],
})
export class MediaModule {}
