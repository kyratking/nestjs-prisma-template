import { parse } from 'date-fns';

export const dateStringToDate = (dateString: string) =>
  parse(dateString, 'dd-MMMM-yyyy', new Date());
