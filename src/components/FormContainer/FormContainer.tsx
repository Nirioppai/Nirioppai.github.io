import { FC, PropsWithChildren } from 'react';

import { FormContainer as MuiFormContainer } from 'react-hook-form-mui';
import type { FormContainerProps } from 'react-hook-form-mui';

export default MuiFormContainer as FC<
  PropsWithChildren<FormContainerProps<any>>
>;
