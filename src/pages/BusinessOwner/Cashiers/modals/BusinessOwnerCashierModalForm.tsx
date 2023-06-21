import { useEffect } from 'react';

import { TextFieldElement } from 'react-hook-form-mui';
import { useQueries } from 'react-query';

import { SelectDropdownElement } from '~/components';
import { auth } from '~/configs';
import { KEYS } from '~/constants';
import { storesService } from '~/services';
const BusinessOwnerCashierModalForm = () => {
  const queries = useQueries([
    {
      queryKey: KEYS.storeInstances,
      queryFn: () => storesService.getStores(auth?.currentUser?.uid || ''),
    },
  ]);

  const stores = queries[0].data || [];

  useEffect(() => {
    queries.forEach((q) => q.refetch());
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <TextFieldElement name='name' label='Cashier Name' required />
      <TextFieldElement name='password' label='Cashier Password' required />
      <SelectDropdownElement
        name='storeId'
        label='Store Name'
        valueKey='_id'
        labelKey='name'
        options={stores}
        required
      />
    </>
  );
};

export default BusinessOwnerCashierModalForm;
