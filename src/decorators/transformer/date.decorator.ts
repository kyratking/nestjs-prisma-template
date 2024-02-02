import {
  Transform,
  TransformFnParams,
  TransformOptions,
} from 'class-transformer';
import { dateStringToDate } from 'src/utils/app/string-to-date';

export const ToDateObject = (transformOptions?: TransformOptions) => {
  return Transform(
    ({ value }: TransformFnParams) => dateStringToDate(value),
    transformOptions,
  );
};
