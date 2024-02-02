import {
  Transform,
  TransformFnParams,
  TransformOptions,
} from 'class-transformer';

export const ToLowerCase = (transformOptions?: TransformOptions) => {
  return Transform(
    ({ value }: TransformFnParams) => value.toLowerCase(),
    transformOptions,
  );
};
