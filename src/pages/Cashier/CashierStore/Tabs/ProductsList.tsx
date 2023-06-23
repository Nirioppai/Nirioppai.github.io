import { FC, PropsWithChildren, useEffect } from 'react';

import { useQueries } from 'react-query';
import { getRecoil } from 'recoil-nexus';

import { DynamicAgGrid } from '~/components';
import { cashierSelectedStore } from '~/configs';
import { KEYS } from '~/constants';
import { productsService } from '~/services';

interface ProductsListProps {
  disableWrite?: boolean;
  handleProductClick?: any;
  selectedItems?: any;
}

const ProductsList: FC<PropsWithChildren<ProductsListProps>> = ({
  disableWrite,
  handleProductClick,
  selectedItems,
}) => {
  const storeId = getRecoil(cashierSelectedStore);

  const queries = useQueries([
    {
      queryKey: [KEYS.products, storeId],
      queryFn: () => productsService.getProductsInStore(storeId),
    },
  ]);

  // @ts-ignore
  const products = queries[0]?.data || [];

  // @ts-ignore
  const isLoading = queries.some((q) => q.isLoading);
  // @ts-ignore
  const isError = queries.some((q) => q.isError);

  useEffect(() => {
    queries.forEach((q) => q.refetch());
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItems]);

  return (
    <>
      <DynamicAgGrid
        searchBarWidth={'100%'}
        rowData={products}
        columnDefs={[
          {
            field: 'name',
            headerName: 'Name',
            sort: 'asc',
            minWidth: 200,
            cellStyle: { fontWeight: 500 },
          },
          {
            field: 'price',
            headerName: 'Price',

            minWidth: 100,
          },
          {
            field: 'stock',
            headerName: 'Stock',

            minWidth: 100,
          },
          {
            field: 'description',
            headerName: 'Description',

            minWidth: 250,
          },
          {
            field: 'availability',
            headerName: 'Availability',

            minWidth: 250,
          },
          {
            headerName: '',
            field: 'actions',
            sortable: false,
            filter: false,
            cellRenderer: 'buttonRenderer',
            cellRendererParams: {
              onClick: handleProductClick,
              label: 'Click me',
            },
            minWidth: 83,
            maxWidth: 83,
          },
        ]}
        isLoading={isLoading}
        isError={isError}
        actions={{
          add: disableWrite,
          edit: disableWrite,
          archive: disableWrite,
        }}
      />
    </>
  );
};

export default ProductsList;
