import { FC } from 'react';

import type { DialogProps } from '@mui/material';

import BusinessOwnerServiceModalForm from './BusinessOwnerServiceModalForm';

import { FormDialog } from '~/components';
import { auth } from '~/configs';
import { KEYS } from '~/constants';
import { usePostMutation } from '~/hooks';
import { ServiceSchema, serviceSchema } from '~/schemas';
import { servicesService } from '~/services';

const AddOwnerServiceModal: FC<DialogProps> = ({ onClose, ...rest }) => {
  const { mutateAsync } = usePostMutation({
    queryKey: KEYS.services,
    mutationFn: servicesService.postOne,
  });

  const onSubmit = async (values: ServiceSchema) => await mutateAsync(values);

  return (
    <FormDialog
      title='Add Service'
      defaultValues={{
        ownerId: auth?.currentUser?.uid,
        name: '',
        price: 0,
        description: '',
        availability: 'Available',
        category: '',
      }}
      schema={serviceSchema}
      onFormSubmit={onSubmit}
      submitText='Add'
      onClose={onClose}
      {...rest}
    >
      <BusinessOwnerServiceModalForm />
    </FormDialog>
  );
};

export default AddOwnerServiceModal;
