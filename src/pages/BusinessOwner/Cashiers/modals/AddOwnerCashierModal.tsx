import { FC } from 'react';

import type { DialogProps } from '@mui/material';

import BusinessOwnerCashierModalForm from './BusinessOwnerCashierModalForm';

import { FormDialog } from '~/components';
import { auth } from '~/configs';
import { KEYS } from '~/constants';
import { usePostMutation } from '~/hooks';
import { CashierSchema, cashierSchema } from '~/schemas';
import { cashiersService } from '~/services';

const AddOwnerCashierModal: FC<DialogProps> = ({ onClose, ...rest }) => {
  const { mutateAsync } = usePostMutation({
    queryKey: KEYS.cashiers,
    mutationFn: cashiersService.postOne,
  });

  const onSubmit = async (values: CashierSchema) => await mutateAsync(values);

  return (
    <FormDialog
      title='Add Cashier'
      defaultValues={{
        name: '',
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
