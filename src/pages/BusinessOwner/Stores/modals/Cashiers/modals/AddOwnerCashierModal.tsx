import { FC } from 'react';

import type { DialogProps } from '@mui/material';
import { Grid } from '@mui/material';
import { useSnackbar } from 'notistack';
import { getRecoil } from 'recoil-nexus';

import BusinessOwnerCashierModalForm from './BusinessOwnerCashierModalForm';

import { FormDialog } from '~/components';
import { auth, selectedStore } from '~/configs';
import { KEYS } from '~/constants';
import { usePostMutation } from '~/hooks';
import { CashierSchema, cashierSchema } from '~/schemas';
import { cashiersService } from '~/services';
import { validateSubmit } from '~/utils';

const AddOwnerCashierModal: FC<DialogProps> = ({ onClose, ...rest }) => {
  const { enqueueSnackbar } = useSnackbar();

  const storeId = getRecoil(selectedStore);
  const { mutateAsync } = usePostMutation({
    queryKey: [KEYS.cashiers, 'Store Cashiers'],
    mutationFn: cashiersService.postOneCashierInsideStore,
  });

  const onSubmit = (values: CashierSchema) =>
    // @ts-ignore
    validateSubmit(values, cashierSchema, mutateAsync, enqueueSnackbar);

  return (
    <FormDialog
      title='Add Cashier'
      defaultValues={{
        ownerId: auth?.currentUser?.uid,
        storeId: storeId,
      }}
      schema={cashierSchema.omit({ email: true })}
      onFormSubmit={onSubmit}
      submitText='Add'
      onClose={onClose}
      {...rest}
    >
      <Grid container spacing={2} columns={16}>
        <Grid item xs={16}>
          <BusinessOwnerCashierModalForm />
        </Grid>
      </Grid>
    </FormDialog>
  );
};

export default AddOwnerCashierModal;
