import { FC } from 'react';

import { TextField } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers';
import {
  Control,
  Controller,
  ControllerProps,
  FieldError,
} from 'react-hook-form';

import { TIME_FORMAT, TIME_FORMAT_MASK } from '~/constants';
import { parseDate } from '~/utils';

export type DatePickerElementProps<TDate = unknown> = any & {
  name: string;
  required?: boolean;
  isDate?: boolean;
  parseError?: (error: FieldError) => string;
  onChange?: (value?: TDate) => void;
  validation?: ControllerProps['rules'];
  parseDate?: (date: TDate) => string;
  control?: Control<any>;
  inputProps?: any;
  helperText?: any;
};

function MuiTimePickerElement({
  isDate,
  parseError,
  name,
  required,
  parseDate,
  validation = {},
  inputProps,
  control,
  ...rest
}: DatePickerElementProps): JSX.Element {
  if (required) {
    validation.required = 'This field is required';
  }

  return (
    <Controller
      name={name}
      rules={validation}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error, invalid },
      }) => (
        <TimePicker
          {...rest}
          value={value || ''}
          onChange={(date, selectionState) => {
            let parsedDate = '';
            if (selectionState) {
              if (typeof parseDate === 'function') {
                parsedDate = parseDate(selectionState);
              }
            } else {
              parsedDate = (date as unknown as Date)
                ?.toISOString()
                .substr(0, 10);
              if (typeof parseDate === 'function') {
                parsedDate = parseDate(date);
              }
            }
            onChange(parsedDate);
            if (typeof rest.onChange === 'function') {
              rest.onChange(parsedDate);
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              {...inputProps}
              required={!!required}
              error={invalid}
              helperText={
                error
                  ? typeof parseError === 'function'
                    ? parseError(error)
                    : error.message
                  : inputProps?.helperText || rest.helperText
              }
            />
          )}
        />
      )}
    />
  );
}

const TimePickerElement: FC<DatePickerElementProps> = (props) => (
  <MuiTimePickerElement
    inputFormat={TIME_FORMAT}
    mask={TIME_FORMAT_MASK}
    parseDate={parseDate}
    {...props}
  />
);

export default TimePickerElement;
