import { HttpStatus } from '@nestjs/common';

export const errorSchema = (statusCode: HttpStatus, message?: string) => ({
  type: 'object',
  example: {
    statusCode,
    message: message || 'Error message',
  },
});
