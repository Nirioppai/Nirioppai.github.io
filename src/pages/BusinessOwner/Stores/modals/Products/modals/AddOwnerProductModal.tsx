import { FC, useEffect } from 'react';

import type { DialogProps } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useQueries } from 'react-query';
import { getRecoil } from 'recoil-nexus';

import BusinessOwnerProductModalForm from './BusinessOwnerProductModalForm';

import { FormDialog } from '~/components';
import { auth, selectedStore } from '~/configs';
import { KEYS } from '~/constants';
import { usePostMutation } from '~/hooks';
import { ProductSchema, productSchema } from '~/schemas';
import { productsService } from '~/services';
import { validateSubmit } from '~/utils';

const AddOwnerProductModal: FC<DialogProps> = ({ onClose, ...rest }) => {
  const { enqueueSnackbar } = useSnackbar();

  const storeId = getRecoil(selectedStore);

  const queries = useQueries([
    {
      queryKey: 'allProducts',
      queryFn: () => productsService.getProducts(auth?.currentUser?.uid || ''),
    },
    {
      queryKey: 'storeProducts',
      queryFn: () => productsService.getProductsInStore(storeId || ''),
    },
  ]);

  useEffect(() => {
    queries.forEach((q) => q.refetch());
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { mutateAsync } = usePostMutation({
    queryKey: [KEYS.products, 'Store Products'],
    mutationFn: productsService.postOneInsideStore,
  });

  const onSubmit = (values: ProductSchema) =>
    // @ts-ignore
    validateSubmit(values, productSchema, mutateAsync, enqueueSnackbar);

  return (
    <FormDialog
      title='Add New Product'
      defaultValues={{
        ownerId: auth?.currentUser?.uid,
        description: '',
        category: '',
        stock: 0,
        availability: 'Available',
        // @ts-ignore
        storeId: storeId,
      }}
      schema={productSchema}
      onFormSubmit={onSubmit}
      submitText='Add'
      onClose={onClose}
      {...rest}
    >
      <BusinessOwnerProductModalForm />
    </FormDialog>
  );
};

export default AddOwnerProductModal;
