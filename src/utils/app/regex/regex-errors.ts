import { ValidationArguments } from 'class-validator';
import { RegexError } from 'src/utils/types';

export const alphabeticError = ({ property }: ValidationArguments) =>
  `The field '${property}' ${RegexError.ALPHABETIC}`;

export const alphanumericError = ({ property }: ValidationArguments) =>
  `The field '${property}' ${RegexError.ALPHANUMERIC}`;

export const numericError = ({ property }: ValidationArguments) =>
  `The field '${property}' ${RegexError.NUMERIC}`;
