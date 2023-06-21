import { FC } from 'react';

import type { DialogProps } from '@mui/material';

import BusinessOwnerProductModalForm from './BusinessOwnerProductModalForm';

import { FormDialog } from '~/components';
import { KEYS } from '~/constants';
import { usePutMutation } from '~/hooks';
import { BaseSchema, ProductSchema, productSchema } from '~/schemas';
import { productsService2 } from '~/services';

const EditOwnerProductModal: FC<
  DialogProps & {
    data: BaseSchema & ProductSchema;
    setData: (data: BaseSchema & ProductSchema) => void;
  }
> = ({ data, setData, onClose, ...rest }) => {
  const { mutateAsync } = usePutMutation({
    queryKey: KEYS.products,
    mutationFn: productsService2.putOne,
  });

  const { _id, ...defaultValues } = data;

  const onSubmit = async (values: ProductSchema) =>
    await mutateAsync({ id: _id, item: { ...defaultValues, ...values } });

  return (
    <FormDialog
      title='Edit Product'
      subtitle={data.name}
      defaultValues={defaultValues}
      schema={productSchema}
      onFormSubmit={onSubmit}
      submitText='Update'
      onClose={onClose}
      {...rest}
    >
      <BusinessOwnerProductModalForm />
    </FormDialog>
  );
};

export default EditOwnerProductModal;
