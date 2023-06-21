import { FC, useEffect } from 'react';

import { useQueries } from 'react-query';

import { AddOwnerProductCategoryModal } from './modals';

import { DynamicAgGrid } from '~/components';
import { KEYS } from '~/constants';
import { categoriesService } from '~/services';

type StoreProductCategoriesGridProps = {
  disableWrite?: boolean;
  storeId: string;
};

const StoreProductCategoriesGrid: FC<StoreProductCategoriesGridProps> = ({
  disableWrite,
  storeId,
}) => {
  const queries = useQueries([
    {
      queryKey: KEYS.productCategories,
      queryFn: () =>
        categoriesService.getProductCategoriesInStore(storeId || ''),
    },
  ]);

  const productCategories = queries[0].data || [];

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
        rowData={productCategories}
        columnDefs={[
          {
            field: 'name',
            headerName: 'Name',
            sort: 'asc',
            minWidth: 200,
            cellStyle: { fontWeight: 500 },
          },
        ]}
        isLoading={isLoading}
        isError={isError}
        actions={{
          add: !disableWrite,
          edit: disableWrite,
          archive: disableWrite,
        }}
        // onArchive={async (row) => await archiveEntry(row._id)}
        AddModal={AddOwnerProductCategoryModal}
        // EditModal={EditOwnerProductCategoryModal}
      />
    </>
  );
};

export default StoreProductCategoriesGrid;
