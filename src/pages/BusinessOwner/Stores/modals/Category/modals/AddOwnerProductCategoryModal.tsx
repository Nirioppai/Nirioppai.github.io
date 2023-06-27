import { FC } from 'react';

import type { DialogProps } from '@mui/material';
import { Grid } from '@mui/material';
import { useSnackbar } from 'notistack';
import { getRecoil } from 'recoil-nexus';

import BusinessOwnerProductCategoryModalForm from './BusinessOwnerProductCategoryModalForm';

import { FormDialog } from '~/components';
import { auth, selectedStore } from '~/configs';
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
  const storeId = getRecoil(selectedStore);

  const { mutateAsync } = usePostMutation({
    queryKey: [KEYS.productCategories, 'Store Product Categories'],
    mutationFn: categoriesService.postOneProductCategoryInsideStore,
  });

  const onSubmit = (values: ProductCategorySchema) =>
    // @ts-ignore
    validateSubmit(values, productCategorySchema, mutateAsync, enqueueSnackbar);

  return (
    <FormDialog
      title='Add Product Category'
      defaultValues={{
        ownerId: auth?.currentUser?.uid,
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
        <Grid item xs={16}>
          <BusinessOwnerProductCategoryModalForm />
        </Grid>
      </Grid>
    </FormDialog>
  );
};

export default AddOwnerProductCategoryModal;
