import { FC, useEffect } from 'react';

import type { DialogProps } from '@mui/material';
import { useQueries } from 'react-query';
import { getRecoil } from 'recoil-nexus';

import BusinessOwnerProductModalForm from './BusinessOwnerProductModalForm';

import { FormDialog } from '~/components';
import { auth, selectedStore } from '~/configs';
import { KEYS } from '~/constants';
import { usePostMutation } from '~/hooks';
import { ProductSchema, productSchema } from '~/schemas';
import { productsService } from '~/services';

const AddOwnerProductModal: FC<DialogProps> = ({ onClose, ...rest }) => {
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

  // const allProducts = queries[0].data || [];
  // const storeProducts = queries[1].data || [];

  useEffect(() => {
    queries.forEach((q) => q.refetch());
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // function getUnassignedProducts(
  //   storeProducts: ProductSchema,
  //   allProducts: ProductSchema
  // ) {
  //   // @ts-ignore
  //   const unassignedProducts = allProducts.filter((product: ProductSchema) => {
  //     // @ts-ignore
  //     return !storeProducts.some(
  //       // @ts-ignore
  //       (storeProduct) => storeProduct._id === product._id
  //     );
  //   });
  //   return unassignedProducts;
  // }

  // const unassignedProducts = getUnassignedProducts(storeProducts, allProducts);

  const { mutateAsync } = usePostMutation({
    queryKey: KEYS.products,
    mutationFn: productsService.postOneInsideStore,
  });

  const onSubmit = async (values: ProductSchema) => {
    await mutateAsync(values);
  };

  return (
    <FormDialog
      title='Add New Product'
      defaultValues={{
        ownerId: auth?.currentUser?.uid,
        name: '',
        price: 0,
        description: '',
        availability: 'Available',
        category: '',
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
