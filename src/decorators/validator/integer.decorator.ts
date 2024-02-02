import {
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

export const IsInteger = (validationOptions?: ValidationOptions) => {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isInteger',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return Number.isInteger(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be an integer`;
        },
      },
    });
  };
};
