import { Injectable } from '@nestjs/common';
import { Log } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';

type LogDTO = Omit<Log, 'id' | 'createdAt' | 'updatedAt'>;

@Injectable()
export class LoggerService {
  constructor(private prisma: PrismaService) {}

  async createLog(log: LogDTO): Promise<Log | void> {
    const exceptions = [
      'InstanceLoader',
      'RoutesResolver',
      'NestFactory',
      'RouterExplorer',
      'NestApplication',
      'Bootstrap',
    ];
    if (exceptions.includes(log.context)) return;
    const newLog = await this.prisma.log.create({ data: log });
    return newLog;
  }
}
