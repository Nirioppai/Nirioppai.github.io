import { FC, useEffect } from 'react';

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
      queryKey: KEYS.products,
      queryFn: () => productsService.getProductsInStore(storeId || ''),
    },
  ]);

  const products = queries[0].data || [];

  // @ts-ignore
  const isLoading = queries.some((q) => q.isLoading);

  // @ts-ignore
  const isError = queries.some((q) => q.isError);

  useEffect(() => {
    queries.forEach((q) => q.refetch());
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            field: 'description',
            headerName: 'Description',

            minWidth: 250,
          },
          {
            field: 'availability',
            headerName: 'Availability',

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
