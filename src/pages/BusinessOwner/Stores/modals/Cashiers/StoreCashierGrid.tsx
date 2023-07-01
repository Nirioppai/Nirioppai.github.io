import { FC } from 'react';

import { useQueries } from 'react-query';

import { AddOwnerCashierModal } from './modals';

import { DynamicAgGrid } from '~/components';
import { KEYS } from '~/constants';
import { cashiersService } from '~/services';

type StoreCashiersGridProps = {
  disableWrite?: boolean;
  storeId: string;
};

const StoreCashierGrid: FC<StoreCashiersGridProps> = ({
  disableWrite,
  storeId,
}) => {
  const queries = useQueries([
    {
      queryKey: [KEYS.cashiers, 'Store Cashiers'],
      queryFn: () => cashiersService.getCashiersInStore(storeId || ''),
    },
  ]);

  const cashiers = queries[0].data || [];

  // @ts-ignore
  const isLoading = queries.some((q) => q.isLoading);

  // @ts-ignore
  const isError = queries.some((q) => q.isError);

  return (
    <>
      <DynamicAgGrid
        rowData={cashiers}
        columnDefs={[
          {
            field: 'name',
            headerName: 'Name',
            sort: 'asc',
            headerTooltip: 'Name',
            minWidth: 200,
            maxWidth: 300,
            cellStyle: { fontWeight: 500 },
          },
          {
            field: 'email',
            headerName: 'Email',
            headerTooltip: 'Email',
            minWidth: 200,
          },
          {
            field: 'password',
            headerName: 'Password',
            minWidth: 200,
            valueFormatter: (params) => '*'.repeat(params.value.length),
            headerTooltip:
              'Password is hidden for security reasons. Click on Edit to view.',
            tooltipValueGetter: () =>
              'Password is hidden for security reasons. Click on Edit to view.',
          },
        ]}
        isLoading={isLoading}
        isError={isError}
        actions={{
          add: !disableWrite,
          addAnother: disableWrite,
          edit: disableWrite,
          archive: disableWrite,
          export: !disableWrite,
        }}
        addText='Add'
        // addAnotherText='Add From Existing Cashiers'
        // onArchive={async (row) => await archiveEntry(row._id)}
        AddModal={AddOwnerCashierModal}
        // EditModal={EditOwnerCashierModal}
      />
    </>
  );
};

export default StoreCashierGrid;
