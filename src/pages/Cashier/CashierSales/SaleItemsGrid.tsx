import { FC, PropsWithChildren } from 'react';

// import { Grid } from '@mui/material';

import AllSales from './AllSales';
import ProductSales from './ProductSales';
import ServiceSales from './ServiceSales';

import { TabWithContent } from '~/components';

interface StoreItemsGridProps {
  disableWrite?: boolean;
}

const SaleItemsGrid: FC<PropsWithChildren<StoreItemsGridProps>> = ({
  disableWrite,
}) => {
  return (
    <>
      <TabWithContent
        tabItems={[
          {
            name: 'All',
            content: <AllSales disableWrite={disableWrite} />,
          },
          {
            name: 'Products',
            content: <ProductSales disableWrite={disableWrite} />,
          },
          {
            name: 'Services',
            content: <ServiceSales disableWrite={disableWrite} />,
          },
        ]}
      />
    </>
  );
};

export default SaleItemsGrid;
