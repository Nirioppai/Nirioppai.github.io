import { FC } from 'react';

import type { DialogProps } from '@mui/material';

import BusinessOwnerServiceModalForm from './BusinessOwnerServiceModalForm';

import { FormDialog } from '~/components';
import { KEYS } from '~/constants';
import { usePutMutation } from '~/hooks';
import { BaseSchema, ServiceSchema, serviceSchema } from '~/schemas';
import { serviceService2 } from '~/services';

const EditOwnerServiceModal: FC<
  DialogProps & {
    data: BaseSchema & ServiceSchema;
    setData: (data: BaseSchema & ServiceSchema) => void;
  }
> = ({ data, setData, onClose, ...rest }) => {
  const { mutateAsync } = usePutMutation({
    queryKey: KEYS.services,
    mutationFn: serviceService2.putOne,
  });

  const { _id, ...defaultValues } = data;

  const onSubmit = async (values: ServiceSchema) =>
    await mutateAsync({ id: _id, item: { ...defaultValues, ...values } });

  return (
    <FormDialog
      title='Edit Service'
      subtitle={data.name}
      defaultValues={defaultValues}
      schema={serviceSchema}
      onFormSubmit={onSubmit}
      submitText='Update'
      onClose={onClose}
      {...rest}
    >
      <BusinessOwnerServiceModalForm />
    </FormDialog>
  );
};

export default EditOwnerServiceModal;
