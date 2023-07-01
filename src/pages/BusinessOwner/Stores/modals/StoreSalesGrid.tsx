import { FC } from 'react';

import AllSales from '../../../Cashier/CashierSales/AllSales';
import ProductSales from '../../../Cashier/CashierSales/ProductSales';
import ServiceSales from '../../../Cashier/CashierSales/ServiceSales';

import { TabWithContent } from '~/components';

type StoreCashiersGridProps = {
  disableWrite?: boolean;
  storeId: string;
};

const StoreSalesGrid: FC<StoreCashiersGridProps> = ({
  disableWrite,
  storeId,
}) => {
  return (
    <>
      <TabWithContent
        tabItems={[
          {
            name: 'All',
            content: <AllSales storeId={storeId} disableWrite={disableWrite} />,
          },
          {
            name: 'Products',
            content: (
              <ProductSales storeId={storeId} disableWrite={disableWrite} />
            ),
          },
          {
            name: 'Services',
            content: (
              <ServiceSales storeId={storeId} disableWrite={disableWrite} />
            ),
          },
        ]}
      />
    </>
  );
};

export default StoreSalesGrid;
