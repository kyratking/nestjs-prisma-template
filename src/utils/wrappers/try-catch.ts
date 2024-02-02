import { throwHttpException } from '../app/http-exception';

export const tryOrThrow = async (
  promises: Promise<unknown>[],
): Promise<unknown[]> => {
  try {
    return await Promise.all(promises);
  } catch (error) {
    const [message, status] = error;
    throwHttpException(message, status);
  }
};
