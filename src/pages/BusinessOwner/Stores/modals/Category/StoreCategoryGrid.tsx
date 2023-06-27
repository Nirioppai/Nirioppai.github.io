import { FC } from 'react';

import { useQueries } from 'react-query';

import {
  AddExistingProductCategoryModal,
  AddOwnerProductCategoryModal,
} from './modals';

import { DynamicAgGrid } from '~/components';
import { KEYS } from '~/constants';
import { categoriesService } from '~/services';

type StoreProductCategoriesGridProps = {
  disableWrite?: boolean;
  storeId: string;
};

const StoreCategoryGrid: FC<StoreProductCategoriesGridProps> = ({
  disableWrite,
  storeId,
}) => {
  const queries = useQueries([
    {
      queryKey: [KEYS.productCategories, 'Store Product Categories'],
      queryFn: () =>
        categoriesService.getProductCategoriesInStore(storeId || ''),
    },
  ]);

  const productCategories = queries[0].data || [];

  // @ts-ignore
  const isLoading = queries.some((q) => q.isLoading);

  // @ts-ignore
  const isError = queries.some((q) => q.isError);

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
        addAnotherText='Add From Existing Product Categories'
        actions={{
          add: !disableWrite,
          addAnother: !disableWrite,
          edit: disableWrite,
          archive: disableWrite,
        }}
        // onArchive={async (row) => await archiveEntry(row._id)}
        AddModal={AddOwnerProductCategoryModal}
        AddAnotherModal={AddExistingProductCategoryModal}
        // EditModal={EditOwnerProductCategoryModal}
      />
    </>
  );
};

export default StoreCategoryGrid;
