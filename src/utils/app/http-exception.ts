import { HttpException, HttpStatus } from '@nestjs/common';

export const throwHttpException = (message: string, status: HttpStatus) => {
  throw new HttpException(message, status);
};
