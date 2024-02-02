import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { MailOptions } from './types';

@Injectable()
export class MailerService {
  private logger = new Logger(MailerService.name);
  private transporter;
  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get<string>('smtp.email'),
        pass: this.configService.get<string>('smtp.password'),
      },
    });
  }

  async sendMail(mailOptions: MailOptions) {
    if (!mailOptions.from)
      mailOptions.from = this.configService.get<string>('smtp.email');
    await this.transporter.sendMail(mailOptions, async (error) => {
      if (error) {
        this.logger.error(
          `Failed to send OTP verification email to ${
            mailOptions.to
          } at ${new Date()}\nError:`,
          error,
        );
      } else {
        this.logger.log(
          `OTP Verification email sent to ${mailOptions.to} at ${new Date()}`,
        );
      }
    });
  }
}
