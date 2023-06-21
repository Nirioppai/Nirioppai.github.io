import { FC } from 'react';

import { DatePickerElement as MuiDatePickerElement } from 'react-hook-form-mui';
import type { DatePickerElementProps } from 'react-hook-form-mui';

import { DATE_FORMAT, DATE_FORMAT_MASK } from '~/constants';
import { parseDate } from '~/utils';

const DatePickerElement: FC<DatePickerElementProps<any>> = (props) => (
  <MuiDatePickerElement
    inputFormat={DATE_FORMAT}
    mask={DATE_FORMAT_MASK}
    parseDate={parseDate}
    {...props}
  />
);

export default DatePickerElement;
