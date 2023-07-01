import { FC } from 'react';

import type { DialogProps } from '@mui/material';
import { useSnackbar } from 'notistack';

import BusinessOwnerCashierModalForm from './BusinessOwnerCashierModalForm';

import { FormDialog } from '~/components';
import { auth } from '~/configs';
import { KEYS } from '~/constants';
import { usePostMutation } from '~/hooks';
import { CashierSchema, cashierSchema } from '~/schemas';
import { cashiersService } from '~/services';
import { validateSubmit } from '~/utils';
const AddOwnerCashierModal: FC<DialogProps> = ({ onClose, ...rest }) => {
  const { enqueueSnackbar } = useSnackbar();

  const { mutateAsync } = usePostMutation({
    queryKey: KEYS.cashiers,
    mutationFn: cashiersService.postOne,
  });

  const onSubmit = (values: CashierSchema) =>
    // @ts-ignore
    validateSubmit(values, cashierSchema, mutateAsync, enqueueSnackbar);

  return (
    <FormDialog
      title='Add Cashier'
      defaultValues={{
        ownerId: auth?.currentUser?.uid,
      }}
      schema={cashierSchema.omit({ email: true })}
      onFormSubmit={onSubmit}
      submitText='Add'
      onClose={onClose}
      {...rest}
    >
      <BusinessOwnerCashierModalForm />
    </FormDialog>
  );
};

export default AddOwnerCashierModal;
