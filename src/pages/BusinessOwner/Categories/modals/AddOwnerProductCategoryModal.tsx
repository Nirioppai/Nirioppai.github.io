import { FC } from 'react';

import type { DialogProps } from '@mui/material';
import { useSnackbar } from 'notistack';

import BusinessOwnerProductCategoryModalForm from './BusinessOwnerProductCategoryModalForm';

import { FormDialog } from '~/components';
import { auth } from '~/configs';
import { KEYS } from '~/constants';
import { usePostMutation } from '~/hooks';
import { ProductCategorySchema, productCategorySchema } from '~/schemas';
import { categoriesService } from '~/services';
import { validateSubmit } from '~/utils';

const AddOwnerProductCategoryModal: FC<DialogProps> = ({
  onClose,
  ...rest
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const { mutateAsync } = usePostMutation({
    queryKey: KEYS.productCategories,
    mutationFn: categoriesService.postOneProductCategory,
  });

  const onSubmit = (values: ProductCategorySchema) =>
    // @ts-ignore
    validateSubmit(values, productCategorySchema, mutateAsync, enqueueSnackbar);

  return (
    <FormDialog
      title='Add Product Category'
      defaultValues={{
        ownerId: auth?.currentUser?.uid,
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
