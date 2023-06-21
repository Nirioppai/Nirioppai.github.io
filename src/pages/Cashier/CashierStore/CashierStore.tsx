import { FC, PropsWithChildren } from 'react';

import { useQueries } from 'react-query';
import { setRecoil } from 'recoil-nexus';

import StoreItemsGrid from './StoreItemsGrid';

// import EquipmentImport from './EquipmentImport';
import {
  PageContentWrapper,
  // TabWithContent
} from '~/components';
import { cashierSelectedStore } from '~/configs';
import { KEYS } from '~/constants';
import { cashiersService } from '~/services';

const CashierStore: FC<PropsWithChildren<{ disableWrite?: boolean }>> = ({
  disableWrite,
}) => {
  const queries = useQueries([
    {
      queryKey: KEYS.cashiers,
      queryFn: () => cashiersService.getLoggedInCashier(),
    },
  ]);

  const cashier = queries[0].data || [];

  cashier[0]?.storeId && setRecoil(cashierSelectedStore, cashier[0]?.storeId);

  return (
    <PageContentWrapper title='Store Sales'>
      <StoreItemsGrid disableWrite={disableWrite} />
    </PageContentWrapper>
  );
};

export default CashierStore;
