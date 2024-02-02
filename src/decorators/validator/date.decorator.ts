import {
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { getMonthNumber } from 'src/utils/app/get-month-number';
import { dob } from 'src/utils/app/regex/regex';

export const IsValidDate = (validationOptions?: ValidationOptions) => {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isValidDate',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (!dob.test(value)) return false;
          const parts = value.split('-');
          const day = parseInt(parts[0], 10);
          const month = parts[1];
          const year = parseInt(parts[2], 10);

          if (year < 1000 || year > 3000) return false;

          const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
          if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
            monthLength[1] = 29;
          }
          return day > 0 && day <= monthLength[getMonthNumber(month) - 1];
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid date in the format of DD-Month-YYYY`;
        },
      },
    });
  };
};
