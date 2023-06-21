import { FC } from 'react';

import type { DialogProps } from '@mui/material';

import BusinessOwnerProductCategoryModalForm from './BusinessOwnerProductCategoryModalForm';

import { FormDialog } from '~/components';
import { auth } from '~/configs';
import { KEYS } from '~/constants';
import { usePostMutation } from '~/hooks';
import { ProductCategorySchema, productCategorySchema } from '~/schemas';
import { categoriesService } from '~/services';

const AddOwnerProductCategoryModal: FC<DialogProps> = ({
  onClose,
  ...rest
}) => {
  const { mutateAsync } = usePostMutation({
    queryKey: KEYS.productCategories,
    mutationFn: categoriesService.postOneProductCategory,
  });

  const onSubmit = async (values: ProductCategorySchema) =>
    await mutateAsync(values);

  return (
    <FormDialog
      title='Add Product Category'
      defaultValues={{
        ownerId: auth?.currentUser?.uid,
        name: '',
      }}
      schema={productCategorySchema}
      onFormSubmit={onSubmit}
      submitText='Add'
      onClose={onClose}
      {...rest}
    >
      <BusinessOwnerProductCategoryModalForm />
    </FormDialog>
  );
};

export default AddOwnerProductCategoryModal;
