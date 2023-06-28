import { FC } from 'react';

import { Chip } from '@mui/material';
import {
  Alert as AlertIcon,
  CheckBold as CheckBoldIcon,
  Information as InformationIcon,
} from 'mdi-material-ui';
import { useQueries } from 'react-query';

import { AddExistingProductModal, AddOwnerProductModal } from './modals';

import { DynamicAgGrid } from '~/components';
import { KEYS } from '~/constants';
import { productsService } from '~/services';

type StoreProductsGridProps = {
  disableWrite?: boolean;
  storeId: string;
};

const StoreProductsGrid: FC<StoreProductsGridProps> = ({
  disableWrite,
  storeId,
}) => {
  const queries = useQueries([
    {
      queryKey: [KEYS.products, 'Store Products'],
      queryFn: () => productsService.getProductsInStore(storeId || ''),
    },
  ]);

  const products = queries[0].data || [];

  // @ts-ignore
  const isLoading = queries.some((q) => q.isLoading);

  // @ts-ignore
  const isError = queries.some((q) => q.isError);

  return (
    <>
      <DynamicAgGrid
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

            minWidth: 250,
          },
          {
            field: 'availability',
            headerName: 'Availability',
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
        ]}
        isLoading={isLoading}
        isError={isError}
        actions={{
          add: !disableWrite,
          addAnother: !disableWrite,
          edit: disableWrite,
          archive: disableWrite,
        }}
        addText='Add New Product'
        addAnotherText='Add From Existing Products'
        // onArchive={async (row) => await archiveEntry(row._id)}
        AddModal={AddOwnerProductModal}
        AddAnotherModal={AddExistingProductModal}
        // EditModal={EditOwnerProductModal}
      />
    </>
  );
};

export default StoreProductsGrid;
