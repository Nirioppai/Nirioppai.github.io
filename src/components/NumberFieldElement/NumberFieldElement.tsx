import { TextField } from '@mui/material';
import type { TextFieldProps } from '@mui/material';
import {
  Control,
  Controller,
  ControllerProps,
  FieldError,
} from 'react-hook-form';

type NumberFieldElementProps = Omit<TextFieldProps, 'name'> & {
  validation?: ControllerProps['rules'];
  name: string;
  parseError?: (error: FieldError) => string;
  control?: Control<any>;
};

const NumberFieldElement = ({
  validation = {},
  parseError,
  required,
  name,
  control,
  ...rest
}: NumberFieldElementProps) => {
  if (required) {
    validation.required = 'This field is required';
  }
  return (
    <Controller
      name={name}
      control={control}
      rules={validation}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { invalid, error },
      }) => (
        <TextField
          {...rest}
          name={name}
          value={value || ''}
          onChange={(e) => {
            onChange(
              Number.isInteger(rest?.inputProps?.step || 1)
                ? parseInt(e.target.value, 10)
                : parseFloat(e.target.value)
            );
          }}
          onBlur={onBlur}
          required={required}
          type='number'
          error={invalid}
          helperText={
            error
              ? typeof parseError === 'function'
                ? parseError(error)
                : error.message
              : rest.helperText
          }
        />
      )}
    />
  );
};

export default NumberFieldElement;
