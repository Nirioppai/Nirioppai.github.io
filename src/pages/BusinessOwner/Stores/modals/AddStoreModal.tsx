import { FC } from 'react';

import type { DialogProps } from '@mui/material';

import BusinessOwnerStoreModalForm from './BusinessOwnerStoreModalForm';

import { FormDialog } from '~/components';
import { auth } from '~/configs';
import { KEYS } from '~/constants';
import { usePostMutation } from '~/hooks';
import { StoreSchema, storeSchema } from '~/schemas';
import { storesService } from '~/services';

const AddStoreModal: FC<DialogProps> = ({ onClose, ...rest }) => {
  const { mutateAsync } = usePostMutation({
    queryKey: KEYS.storeInstances,
    mutationFn: storesService.postOne,
  });

  const onSubmit = async (values: StoreSchema) => await mutateAsync(values);

  return (
    <FormDialog
      title='Add Store'
      defaultValues={{
        name: '',
        address: '',
        ownerId: auth?.currentUser?.uid,
      }}
      schema={storeSchema}
      onFormSubmit={onSubmit}
      submitText='Add'
      onClose={onClose}
      {...rest}
    >
      <BusinessOwnerStoreModalForm />
    </FormDialog>
  );
};

export default AddStoreModal;
