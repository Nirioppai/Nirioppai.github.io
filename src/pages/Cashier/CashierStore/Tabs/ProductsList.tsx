import { FC, PropsWithChildren, useEffect } from 'react';

import { Chip } from '@mui/material';
import {
  Alert as AlertIcon,
  CheckBold as CheckBoldIcon,
  Information as InformationIcon,
} from 'mdi-material-ui';
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
      queryFn: () => productsService.getCashierProductsInStore(storeId),
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
            headerTooltip: 'Name',
            sort: 'asc',
            minWidth: 200,
            cellStyle: { fontWeight: 500 },
          },
          {
            field: 'price',
            headerName: 'Price',
            headerTooltip: 'Price',
            minWidth: 100,
          },
          {
            field: 'category',
            headerName: 'Category',
            headerTooltip: 'Category',
            minWidth: 200,
          },
          {
            field: 'stock',
            headerName: 'Stock',
            headerTooltip: 'Stock',
            cellRenderer: (params: any) => {
              const stockValue = params.data.stock;
              let color = 'success';
              let IconComponent = CheckBoldIcon;

              if (stockValue < 10) {
                color = 'error';
                IconComponent = AlertIcon;
              } else if (stockValue < 20) {
                color = 'warning';
                IconComponent = InformationIcon;
              }

              return (
                <div>
                  <Chip
                    icon={<IconComponent />}
                    // @ts-ignore
                    color={color}
                    size='small'
                    variant='filled'
                    label={stockValue}
                  />
                </div>
              );
            },
            tooltipValueGetter: (params: any) =>
              params.data.stock < 10
                ? 'Critically Low Stock.'
                : params.data.stock < 20
                ? 'Low Stock Levels.'
                : 'Acceptable Stock Levels.',
            minWidth: 100,
          },
          {
            field: 'description',
            headerName: 'Description',
            headerTooltip: 'Description',
            minWidth: 200,
          },
          {
            field: 'availability',
            headerName: 'Availability',
            headerTooltip: 'Availability',
            cellRenderer: (params: any) => {
              const availability = params.data.availability;

              let color = 'success';
              let IconComponent = CheckBoldIcon;

              if (availability == 'Unavailable') {
                color = 'error';
                IconComponent = AlertIcon;
              }
              return (
                <div>
                  <Chip
                    icon={<IconComponent />}
                    // @ts-ignore
                    color={color}
                    size='small'
                    variant='filled'
                    label={availability}
                  />
                </div>
              );
            },

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
