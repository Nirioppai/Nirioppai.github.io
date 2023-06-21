import { FC } from 'react';

import type { DialogProps } from '@mui/material';
import { Grid } from '@mui/material';
import { getRecoil } from 'recoil-nexus';

import BusinessOwnerProductCategoryModalForm from './BusinessOwnerProductCategoryModalForm';

import { FormDialog } from '~/components';
import { auth, selectedStore } from '~/configs';
import { KEYS } from '~/constants';
import { usePostMutation } from '~/hooks';
import { ProductCategorySchema, productCategorySchema } from '~/schemas';
import { categoriesService } from '~/services';

const AddOwnerProductCategoryModal: FC<DialogProps> = ({
  onClose,
  ...rest
}) => {
  const storeId = getRecoil(selectedStore);

  const { mutateAsync } = usePostMutation({
    queryKey: KEYS.productCategories,
    mutationFn: categoriesService.postOneProductCategoryInsideStore,
  });

  const onSubmit = async (values: ProductCategorySchema) =>
    await mutateAsync(values);

  return (
    <FormDialog
      title='Add Product Category'
      maxWidth={'md'}
      defaultValues={{
        ownerId: auth?.currentUser?.uid,
        name: '',
        // @ts-ignore
        storeId: storeId,
      }}
      schema={productCategorySchema}
      onFormSubmit={onSubmit}
      submitText='Add'
      onClose={onClose}
      {...rest}
    >
      <Grid container spacing={2} columns={16}>
        <Grid item xs={8}>
          <BusinessOwnerProductCategoryModalForm />
        </Grid>
        <Grid item xs={8}>
          OR
        </Grid>
      </Grid>
    </FormDialog>
  );
};

export default AddOwnerProductCategoryModal;
