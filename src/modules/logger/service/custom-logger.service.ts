import {
  ConsoleLogger,
  ConsoleLoggerOptions,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getLogLevels } from 'src/utils/app/get-log-levels';
import { Message } from '../types';
import { LoggerService } from './logger.service';

@Injectable()
export class CustomLogger extends ConsoleLogger {
  private readonly logsService: LoggerService;

  constructor(
    context: string,
    options: ConsoleLoggerOptions,
    configService: ConfigService,
    logsService: LoggerService,
  ) {
    const environment = configService.get('NODE_ENV');

    super(context, {
      ...options,
      logLevels: getLogLevels(environment === 'production'),
    });

    this.logsService = logsService;
  }
  log(data: Message | string, context?: string) {
    let message, ip_address;
    if (typeof data === 'string') {
      message = data;
      ip_address = null;
    } else {
      message = data.message;
      ip_address = data.ip_address;
    }
    super.log.apply(this, [message, context]);

    this.logsService.createLog({
      message,
      context,
      level: 'log',
      ip_address,
    });
  }
  error(data: Message | string, stack?: string, context?: string) {
    let message, ip_address;
    if (typeof data === 'string') {
      message = data;
      ip_address = null;
    } else {
      message = data.message;
      ip_address = data.ip_address;
    }
    super.error.apply(this, [message, stack, context]);

    this.logsService.createLog({
      message,
      context,
      level: 'error',
      ip_address,
    });
  }
  warn(data: Message | string, context?: string) {
    let message, ip_address;
    if (typeof data === 'string') {
      message = data;
      ip_address = null;
    } else {
      message = data.message;
      ip_address = data.ip_address;
    }
    super.warn.apply(this, [message, context]);

    this.logsService.createLog({
      message,
      context,
      level: 'error',
      ip_address,
    });
  }
  debug(data: Message | string, context?: string) {
    let message, ip_address;
    if (typeof data === 'string') {
      message = data;
      ip_address = null;
    } else {
      message = data.message;
      ip_address = data.ip_address;
    }
    super.debug.apply(this, [message, context]);

    this.logsService.createLog({
      message,
      context,
      level: 'error',
      ip_address,
    });
  }
  verbose(data: Message | string, context?: string) {
    let message, ip_address;
    if (typeof data === 'string') {
      message = data;
      ip_address = null;
    } else {
      message = data.message;
      ip_address = data.ip_address;
    }
    super.debug.apply(this, [message, context]);

    this.logsService.createLog({
      message,
      context,
      level: 'error',
      ip_address,
    });
  }
}
