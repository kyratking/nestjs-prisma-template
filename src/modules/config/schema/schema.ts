import { z } from 'nestjs-zod/z';

/**
 * If you do not have any environment variable present at the time, disable the validation here by commenting the code,
 */
export const schema = z.object({
  // App
  TZ: z.string().default('UTC'),
  NODE_ENV: z.string().default('development'),
  PORT: z.coerce.number().default(3000),

  // Database
  DATABASE_URL: z.string().url(),

  // MAIL
  SMTP_EMAIL: z.string(),
  SMTP_PASSWORD: z.string(),

  // AWS
  AWS_BUCKET_NAME: z.string(),
  AWS_REGION: z.string(),
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
});
