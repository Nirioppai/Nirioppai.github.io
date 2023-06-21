import { FC } from 'react';

import type { DialogProps } from '@mui/material';

import BusinessOwnerProductCategoryModalForm from './BusinessOwnerProductCategoryModalForm';

import { FormDialog } from '~/components';
import { KEYS } from '~/constants';
import { usePutMutation } from '~/hooks';
import {
  BaseSchema,
  ProductCategorySchema,
  productCategorySchema,
} from '~/schemas';
import { categoriesService2 } from '~/services';

const EditOwnerProductCategoryModal: FC<
  DialogProps & {
    data: BaseSchema & ProductCategorySchema;
    setData: (data: BaseSchema & ProductCategorySchema) => void;
  }
> = ({ data, setData, onClose, ...rest }) => {
  const { mutateAsync } = usePutMutation({
    queryKey: KEYS.productCategories,
    mutationFn: categoriesService2.putOne,
  });

  const { _id, ...defaultValues } = data;

  const onSubmit = async (values: ProductCategorySchema) =>
    await mutateAsync({ id: _id, item: { ...defaultValues, ...values } });

  return (
    <FormDialog
      title='Edit Product Category'
      subtitle={data.name}
      defaultValues={defaultValues}
      schema={productCategorySchema}
      onFormSubmit={onSubmit}
      submitText='Update'
      onClose={onClose}
      {...rest}
    >
      <BusinessOwnerProductCategoryModalForm />
    </FormDialog>
  );
};

export default EditOwnerProductCategoryModal;
