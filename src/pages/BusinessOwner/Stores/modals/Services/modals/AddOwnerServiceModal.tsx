import { FC } from 'react';

import type { DialogProps } from '@mui/material';
import { Grid } from '@mui/material';
import { getRecoil } from 'recoil-nexus';

import BusinessOwnerServiceModalForm from './BusinessOwnerServiceModalForm';

import { FormDialog } from '~/components';
import { auth, selectedStore } from '~/configs';
import { KEYS } from '~/constants';
import { usePostMutation } from '~/hooks';
import { ServiceSchema, serviceSchema } from '~/schemas';
import { servicesService } from '~/services';

const AddOwnerServiceModal: FC<DialogProps> = ({ onClose, ...rest }) => {
  const storeId = getRecoil(selectedStore);

  const { mutateAsync } = usePostMutation({
    queryKey: KEYS.services,
    mutationFn: servicesService.postOneInsideStore,
  });

  const onSubmit = async (values: ServiceSchema) => await mutateAsync(values);

  return (
    <FormDialog
      title='Add Service'
      maxWidth={'md'}
      defaultValues={{
        ownerId: auth?.currentUser?.uid,
        name: '',
        price: 0,
        description: '',
        availability: 'Available',
        category: '',
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
        <Grid item xs={8}>
          <BusinessOwnerServiceModalForm />
        </Grid>
        <Grid item xs={8}>
          OR
        </Grid>
      </Grid>
    </FormDialog>
  );
};

export default AddOwnerServiceModal;
