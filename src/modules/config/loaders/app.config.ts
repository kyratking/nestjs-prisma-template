import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  environment: process.env.NODE_ENV,
  port: parseInt(process.env.PORT, 10) || 3000,
}));
