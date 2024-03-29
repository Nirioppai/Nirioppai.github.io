import { FC, useEffect } from 'react';

import type { DialogProps } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useQueries } from 'react-query';
import { getRecoil } from 'recoil-nexus';

import { FormDialog, SelectDropdownElement } from '~/components';
import { auth, selectedStore } from '~/configs';
import { KEYS } from '~/constants';
import { usePostMutation } from '~/hooks';
import { ProductSchema, productSchema } from '~/schemas';
import { productsService } from '~/services';
import { validateSubmit } from '~/utils';

const AddExistingProductModal: FC<DialogProps> = ({ onClose, ...rest }) => {
  const { enqueueSnackbar } = useSnackbar();

  const storeId = getRecoil(selectedStore);

  const queries = useQueries([
    {
      queryKey: 'allProducts',
      queryFn: () => productsService.getProducts(auth?.currentUser?.uid || ''),
    },
    {
      queryKey: [KEYS.products, 'Store Products'],
      queryFn: () => productsService.getProductsInStore(storeId || ''),
    },
  ]);

  const allProducts = queries[0].data || [];
  const storeProducts = queries[1].data || [];

  useEffect(() => {
    queries.forEach((q) => q.refetch());
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allProducts]);

  function getUnassignedProducts(
    storeProducts: ProductSchema,
    allProducts: ProductSchema
  ) {
    // @ts-ignore
    const unassignedProducts = allProducts.filter((product: ProductSchema) => {
      // @ts-ignore
      return !storeProducts.some(
        // @ts-ignore
        (storeProduct) => storeProduct._id === product._id
      );
    });
    return unassignedProducts;
  }

  const unassignedProducts = getUnassignedProducts(storeProducts, allProducts);

  const { mutateAsync } = usePostMutation({
    queryKey: KEYS.products,
    mutationFn: productsService.postOneExistingProductInsideStore,
  });

  const onSubmit = (values: ProductSchema) =>
    // @ts-ignore
    validateSubmit(values, productSchema, mutateAsync, enqueueSnackbar);

  return (
    <FormDialog
      title='Add From Existing Products'
      defaultValues={{
        ownerId: auth?.currentUser?.uid,
        name: '',
        price: 0,
        description: '',
        availability: 'Available',
        category: 'helow',
        stock: 0,
        // @ts-ignore
        storeId: storeId,
      }}
      schema={productSchema}
      onFormSubmit={onSubmit}
      submitText='Add'
      onClose={onClose}
      {...rest}
    >
      <SelectDropdownElement
        name='name'
        label='Product Name'
        valueKey='_id'
        labelKey='name'
        options={unassignedProducts}
        required
      />
    </FormDialog>
  );
};

export default AddExistingProductModal;
