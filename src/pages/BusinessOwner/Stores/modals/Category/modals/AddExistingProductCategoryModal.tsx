import { FC, useEffect } from 'react';

import type { DialogProps } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useQueries } from 'react-query';
import { getRecoil } from 'recoil-nexus';

import { FormDialog, SelectDropdownElement } from '~/components';
import { auth, selectedStore } from '~/configs';
import { KEYS } from '~/constants';
import { usePostMutation } from '~/hooks';
import { ProductCategorySchema, productCategorySchema } from '~/schemas';
import { categoriesService } from '~/services';
import { validateSubmit } from '~/utils';

const AddExistingProductCategoryModal: FC<DialogProps> = ({
  onClose,
  ...rest
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const storeId = getRecoil(selectedStore);

  const queries = useQueries([
    {
      queryKey: 'allProductCategories',
      queryFn: () =>
        categoriesService.getProductCategories(auth?.currentUser?.uid || ''),
    },
    {
      queryKey: [KEYS.productCategories, 'Store Product Categories'],
      queryFn: () =>
        categoriesService.getProductCategoriesInStore(storeId || ''),
    },
  ]);

  const allProductCategories = queries[0].data || [];
  const storeProductCategories = queries[1].data || [];

  useEffect(() => {
    queries.forEach((q) => q.refetch());
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allProductCategories]);

  function getUnassignedProducts(
    storeProductCategories: ProductCategorySchema,
    allProductCategories: ProductCategorySchema
  ) {
    // @ts-ignore
    const unassignedProductCategories = allProductCategories.filter(
      (productCategory: ProductCategorySchema) => {
        // @ts-ignore
        return !storeProductCategories.some(
          // @ts-ignore
          (storeProductCategory) =>
            storeProductCategory._id === productCategory._id
        );
      }
    );
    return unassignedProductCategories;
  }

  const unassignedProductCategories = getUnassignedProducts(
    storeProductCategories,
    allProductCategories
  );

  const { mutateAsync } = usePostMutation({
    queryKey: KEYS.productCategories,
    mutationFn: categoriesService.postOneExistingProductCategoryInsideStore,
  });

  const onSubmit = (values: ProductCategorySchema) =>
    // @ts-ignore
    validateSubmit(values, productCategorySchema, mutateAsync, enqueueSnackbar);

  return (
    <FormDialog
      title='Add From Existing Product Categories'
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
      <SelectDropdownElement
        name='name'
        label='Product Category Name'
        valueKey='_id'
        labelKey='name'
        options={unassignedProductCategories}
        required
      />
    </FormDialog>
  );
};

export default AddExistingProductCategoryModal;
