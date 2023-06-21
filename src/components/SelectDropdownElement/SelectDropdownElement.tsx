import type { TextFieldProps } from '@mui/material';
import { Control, ControllerProps } from 'react-hook-form';
import { SelectElement } from 'react-hook-form-mui';
type NumberFieldElementProps = Omit<TextFieldProps, 'name'> & {
  validation?: ControllerProps['rules'];
  name: string;
  label: string;
  options?:
    | {
        id: string | number;
        title: string | number;
      }[]
    | any[];
  focused?: boolean;
  hiddenLabel?: boolean;
  valueKey?: string;
  labelKey?: string;
  type?: 'string' | 'number';
  margin?: 'none' | 'normal' | 'dense';
  objectOnChange?: boolean;
  onChange?: (value: any) => void;
  control?: Control<any>;
};

const SelectDropdownElement = ({
  validation = {},
  name,
  label,
  options,
  focused,
  hiddenLabel,
  valueKey,
  labelKey,
  type,
  objectOnChange,
  onChange,
  required,
  control,
  margin,
  ...rest
}: NumberFieldElementProps) => {
  if (required) {
    validation.required = 'This field is required';
  }
  return (
    <SelectElement
      name={name}
      label={label}
      valueKey={valueKey}
      labelKey={labelKey}
      // @ts-ignore
      options={options.length !== 0 ? options : [{ name: 'No Options' }]}
      focused={focused}
      hiddenLabel={hiddenLabel}
      type={type}
      objectOnChange={objectOnChange}
      onChange={onChange}
      required={required}
      margin={margin}
      {...rest}
    />
  );
};

export default SelectDropdownElement;
