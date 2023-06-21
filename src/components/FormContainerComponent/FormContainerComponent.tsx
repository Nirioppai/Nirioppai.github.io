import { PropsWithChildren } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import {
  Grid,

  //  Typography
} from '@mui/material';
import {
  DefaultValues,
  SubmitHandler,
  UseFormProps,
  useForm,
} from 'react-hook-form';
import { Schema as ZodSchema } from 'zod';

import { FormContainer } from '~/components';

export interface FormContainerComponentInterface<S, Z> {
  useFormProps?: UseFormProps;
  defaultValues: DefaultValues<S>;
  schema: Z;
  // @ts-ignore
  onFormSubmit: SubmitHandler<S>;
  submitText?: string;
}

export const FormContainerComponent = <S, Z extends ZodSchema<any, any>>({
  useFormProps,
  defaultValues,
  schema,
  onFormSubmit,
  submitText = 'Submit',

  children,
}: PropsWithChildren<FormContainerComponentInterface<S, Z>>) => {
  const formContext = useForm({
    ...useFormProps,
    defaultValues,
    resolver: zodResolver(schema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = formContext;

  return (
    <FormContainer
      formContext={formContext}
      handleSubmit={handleSubmit(
        async (data, e) => {
          try {
            // @ts-ignore
            await onFormSubmit(data, e);
          } finally {
            () => {
              console.log('Form submitted');
            };
          }
        },
        (error) => console.error(error)
      )}
    >
      {children}
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}></Grid>
        <Grid container item xs={6} justifyContent='flex-end'>
          <LoadingButton
            variant='contained'
            type='submit'
            loading={isSubmitting}
          >
            {submitText}
          </LoadingButton>
        </Grid>
      </Grid>
    </FormContainer>
  );
};
