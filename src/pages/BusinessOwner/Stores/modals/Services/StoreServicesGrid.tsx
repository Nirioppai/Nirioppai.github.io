import { FC, useEffect } from 'react';

import { useQueries } from 'react-query';

import { AddExistingServiceModal, AddOwnerServiceModal } from './modals';

import { DynamicAgGrid } from '~/components';
import { KEYS } from '~/constants';
import { servicesService } from '~/services';

type StoreServicesGridProps = {
  disableWrite?: boolean;
  storeId: string;
};

const StoreServicesGrid: FC<StoreServicesGridProps> = ({
  disableWrite,
  storeId,
}) => {
  const queries = useQueries([
    {
      queryKey: KEYS.services,
      queryFn: () => servicesService.getServicesInStore(storeId || ''),
    },
  ]);

  const services = queries[0].data || [];

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
        rowData={services}
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
            field: 'category',
            headerName: 'Category',

            minWidth: 150,
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
        addText='Add New Service'
        addAnotherText='Add From Existing Services'
        // onArchive={async (row) => await archiveEntry(row._id)}
        AddModal={AddOwnerServiceModal}
        AddAnotherModal={AddExistingServiceModal}
        // EditModal={EditOwnerServiceModal}
      />
    </>
  );
};

export default StoreServicesGrid;
