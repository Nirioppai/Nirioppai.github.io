import { FC, PropsWithChildren } from 'react';

import { Chip } from '@mui/material';
import {
  Alert as AlertIcon,
  CheckBold as CheckBoldIcon,
  Information as InformationIcon,
} from 'mdi-material-ui';
import { useQueries } from 'react-query';

// eslint-disable-next-line import/order
import { AddOwnerProductModal, EditOwnerProductModal } from './modals';
import { DynamicAgGrid } from '~/components';
import { auth } from '~/configs';
import { KEYS } from '~/constants';
import { useArchiveMutation } from '~/hooks';
import { productsService } from '~/services';

const OwnerProductsGrid: FC<PropsWithChildren<{ disableWrite?: boolean }>> = ({
  disableWrite,
}) => {
  const queries = useQueries([
    {
      queryKey: KEYS.products,
      queryFn: () => productsService.getProducts(auth?.currentUser?.uid || ''),
    },
  ]);

  const products = queries[0].data || [];

  const isLoading = queries.some((q) => q.isLoading);
  // const isSuccess = queries.every((q) => q.isSuccess);
  const isError = queries.some((q) => q.isError);

  // MUTATIONS

  const { mutateAsync: archiveEntry } = useArchiveMutation({
    queryKey: KEYS.products,
    mutationFn: productsService.archiveOne,
  });

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
          edit: !disableWrite,
          archive: !disableWrite,
        }}
        onArchive={async (row) => await archiveEntry(row._id)}
        AddModal={AddOwnerProductModal}
        EditModal={EditOwnerProductModal}
      />
    </>
  );
};

export default OwnerProductsGrid;
