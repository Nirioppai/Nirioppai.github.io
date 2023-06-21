import { PropsWithChildren, useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import type { DialogProps } from '@mui/material';
import {
  DefaultValues,
  SubmitHandler,
  UseFormProps,
  useForm,
} from 'react-hook-form';
import { Schema as ZodSchema } from 'zod';

import { FormContainer } from '~/components';

export interface FormDialogProps<S, Z> extends Omit<DialogProps, 'onSubmit'> {
  title: string;
  subtitle?: string;
  useFormProps?: UseFormProps;
  defaultValues: DefaultValues<S>;
  schema: Z;
  // @ts-ignore
  onFormSubmit: SubmitHandler<S>;
  submitText?: string;
}

export const FormDialog = <S, Z extends ZodSchema<any, any>>({
  title,
  subtitle,
  useFormProps,
  defaultValues,
  schema,
  onFormSubmit,
  submitText = 'Submit',
  maxWidth = 'xs',
  onClose,
  children,
  open,
  ...rest
}: PropsWithChildren<FormDialogProps<S, Z>>) => {
  const formContext = useForm({
    ...useFormProps,
    defaultValues,
    resolver: zodResolver(schema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = formContext;

  const handleClose: DialogProps['onClose'] = (event, reason) => {
    if (isSubmitting) return;
    onClose?.(event, reason);
    formContext.reset();
  };

  useEffect(() => {
    formContext.reset(defaultValues);
  }, [defaultValues, formContext]);

  // console.log('open: ', open);

  return (
    <Dialog
      maxWidth={maxWidth}
      open={open}
      onClose={handleClose}
      disableEscapeKeyDown={isSubmitting}
      {...rest}
    >
      <FormContainer
        formContext={formContext}
        handleSubmit={handleSubmit(
          async (data, e) => {
            try {
              // @ts-ignore
              await onFormSubmit(data, e);
            } finally {
              onClose?.({}, 'backdropClick');
            }
          },
          (error) => console.error(error)
        )}
      >
        <DialogTitle id='archive-dialog-title'>
          <Typography variant='h3' component='span'>
            {title}
          </Typography>
          <Typography variant='subtitle1' component='div'>
            {subtitle}
          </Typography>
        </DialogTitle>
        <DialogContent
          sx={{
            '& .MuiFormControl-root:last-child': {
              mb: 0,
            },
          }}
        >
          {children}
        </DialogContent>
        <DialogActions>
          <Button
            variant='text'
            onClick={(e) => handleClose(e, 'backdropClick')}
            disabled={isSubmitting}
          >
            Discard
          </Button>
          <LoadingButton
            variant='contained'
            type='submit'
            loading={isSubmitting}
          >
            {submitText}
          </LoadingButton>
        </DialogActions>
      </FormContainer>
    </Dialog>
  );
};
