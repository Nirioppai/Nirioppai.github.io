import { FC, PropsWithChildren } from 'react';

import { useQueries } from 'react-query';
import { setRecoil } from 'recoil-nexus';

import SaleItemsGrid from './SaleItemsGrid';

import { PageContentWrapper } from '~/components';
import { cashierSelectedStore } from '~/configs';
import { KEYS } from '~/constants';
import { cashiersService } from '~/services';

const CashierSales: FC<PropsWithChildren<{ disableWrite?: boolean }>> = ({
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
      <SaleItemsGrid disableWrite={disableWrite} />
    </PageContentWrapper>
  );
};

export default CashierSales;
