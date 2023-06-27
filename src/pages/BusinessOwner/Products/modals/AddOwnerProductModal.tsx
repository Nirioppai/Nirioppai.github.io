import { FC } from 'react';

import type { DialogProps } from '@mui/material';
import { useSnackbar } from 'notistack';

import BusinessOwnerProductModalForm from './BusinessOwnerProductModalForm';

import { FormDialog } from '~/components';
import { auth } from '~/configs';
import { KEYS } from '~/constants';
import { usePostMutation } from '~/hooks';
import { ProductSchema, productSchema } from '~/schemas';
import { productsService } from '~/services';
import { validateSubmit } from '~/utils';

const AddOwnerProductModal: FC<DialogProps> = ({ onClose, ...rest }) => {
  const { enqueueSnackbar } = useSnackbar();

  const { mutateAsync } = usePostMutation({
    queryKey: KEYS.products,
    mutationFn: productsService.postOne,
  });

  const onSubmit = (values: ProductSchema) =>
    // @ts-ignore
    validateSubmit(values, productSchema, mutateAsync, enqueueSnackbar);

  return (
    <FormDialog
      title='Add Product'
      defaultValues={{
        ownerId: auth?.currentUser?.uid,
        category: '',
        description: '',
        stock: 0,
        availability: 'Available',
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
