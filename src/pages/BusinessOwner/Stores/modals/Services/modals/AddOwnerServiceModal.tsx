import { FC } from 'react';

import type { DialogProps } from '@mui/material';
import { Grid } from '@mui/material';
import { useSnackbar } from 'notistack';
import { getRecoil } from 'recoil-nexus';

import BusinessOwnerServiceModalForm from './BusinessOwnerServiceModalForm';

import { FormDialog } from '~/components';
import { auth, selectedStore } from '~/configs';
import { KEYS } from '~/constants';
import { usePostMutation } from '~/hooks';
import { ServiceSchema, serviceSchema } from '~/schemas';
import { servicesService } from '~/services';
import { validateSubmit } from '~/utils';

const AddOwnerServiceModal: FC<DialogProps> = ({ onClose, ...rest }) => {
  const { enqueueSnackbar } = useSnackbar();
  const storeId = getRecoil(selectedStore);

  const { mutateAsync } = usePostMutation({
    queryKey: [KEYS.services, 'Store Services'],
    mutationFn: servicesService.postOneInsideStore,
  });

  const onSubmit = (values: ServiceSchema) =>
    // @ts-ignore
    validateSubmit(values, serviceSchema, mutateAsync, enqueueSnackbar);

  return (
    <FormDialog
      title='Add Service'
      defaultValues={{
        ownerId: auth?.currentUser?.uid,
        category: '',
        description: '',
        availability: 'Available',
        // @ts-ignore
        storeId: storeId,
      }}
      schema={serviceSchema}
      onFormSubmit={onSubmit}
      submitText='Add'
      onClose={onClose}
      {...rest}
    >
      <Grid container spacing={2} columns={16}>
        <Grid item xs={16}>
          <BusinessOwnerServiceModalForm />
        </Grid>
      </Grid>
    </FormDialog>
  );
};

export default AddOwnerServiceModal;
