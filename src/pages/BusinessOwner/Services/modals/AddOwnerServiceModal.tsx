import { FC } from 'react';

import type { DialogProps } from '@mui/material';
import { useSnackbar } from 'notistack';

import BusinessOwnerServiceModalForm from './BusinessOwnerServiceModalForm';

import { FormDialog } from '~/components';
import { auth } from '~/configs';
import { KEYS } from '~/constants';
import { usePostMutation } from '~/hooks';
import { ServiceSchema, serviceSchema } from '~/schemas';
import { servicesService } from '~/services';
import { validateSubmit } from '~/utils';

const AddOwnerServiceModal: FC<DialogProps> = ({ onClose, ...rest }) => {
  const { enqueueSnackbar } = useSnackbar();

  const { mutateAsync } = usePostMutation({
    queryKey: KEYS.services,
    mutationFn: servicesService.postOne,
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
