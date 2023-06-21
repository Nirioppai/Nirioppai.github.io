import { FC, useEffect } from 'react';

import type { DialogProps } from '@mui/material';
import { useQueries } from 'react-query';
import { getRecoil } from 'recoil-nexus';

import { FormDialog, SelectDropdownElement } from '~/components';
import { auth, selectedStore } from '~/configs';
import { KEYS } from '~/constants';
import { usePostMutation } from '~/hooks';
import { ServiceSchema, serviceSchema } from '~/schemas';
import { servicesService } from '~/services';

const AddExistingServiceModal: FC<DialogProps> = ({ onClose, ...rest }) => {
  const storeId = getRecoil(selectedStore);

  const queries = useQueries([
    {
      queryKey: 'allServices',
      queryFn: () => servicesService.getServices(auth?.currentUser?.uid || ''),
    },
    {
      queryKey: 'storeServices',
      queryFn: () => servicesService.getServicesInStore(storeId || ''),
    },
  ]);

  const allServices = queries[0].data || [];
  const storeServices = queries[1].data || [];

  useEffect(() => {
    queries.forEach((q) => q.refetch());
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getUnassignedServices(
    storeServices: ServiceSchema,
    allServices: ServiceSchema
  ) {
    // @ts-ignore
    const unassignedServices = allServices.filter((service: ServiceSchema) => {
      // @ts-ignore
      return !storeServices.some(
        // @ts-ignore
        (storeService) => storeService._id === service._id
      );
    });
    return unassignedServices;
  }

  const unassignedServices = getUnassignedServices(storeServices, allServices);

  const { mutateAsync } = usePostMutation({
    queryKey: KEYS.services,
    mutationFn: servicesService.postOneExistingServiceInsideStore,
  });

  const onSubmit = async (values: ServiceSchema) => {
    await mutateAsync(values);
  };

  return (
    <FormDialog
      title='Add From Existing Services'
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
      schema={serviceSchema}
      onFormSubmit={onSubmit}
      submitText='Add'
      onClose={onClose}
      {...rest}
    >
      <SelectDropdownElement
        name='name'
        label='Service Name'
        valueKey='_id'
        labelKey='name'
        options={unassignedServices}
        required
      />
    </FormDialog>
  );
};

export default AddExistingServiceModal;
