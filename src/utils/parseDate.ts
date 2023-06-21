import { formatISO, parse } from 'date-fns';

import { DATE_FORMAT } from '~/constants';

export const parseDate = (date: unknown) => {
  if (date instanceof Date && !isNaN(date.valueOf())) {
    return date.toISOString();
  }

  try {
    return formatISO(parse((date as string) || '', DATE_FORMAT, new Date()), {
      representation: 'date',
    });
  } catch {
    return '';
  }
};
