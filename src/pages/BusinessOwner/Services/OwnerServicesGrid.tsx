import { FC, PropsWithChildren, useEffect } from 'react';

import { useQueries } from 'react-query';

// eslint-disable-next-line import/order
import { AddOwnerServiceModal, EditOwnerServiceModal } from './modals';
import { DynamicAgGrid } from '~/components';
import { auth } from '~/configs';
import { KEYS } from '~/constants';
import { useArchiveMutation } from '~/hooks';
import { servicesService } from '~/services';

const OwnerServicesGrid: FC<PropsWithChildren<{ disableWrite?: boolean }>> = ({
  disableWrite,
}) => {
  // @ts-ignore

  const queries = useQueries([
    {
      queryKey: KEYS.services,
      queryFn: () => servicesService.getServices(auth?.currentUser?.uid || ''),
    },
  ]);

  const services = queries[0].data || [];

  const isLoading = queries.some((q) => q.isLoading);
  // const isSuccess = queries.every((q) => q.isSuccess);
  const isError = queries.some((q) => q.isError);

  useEffect(() => {
    queries.forEach((q) => q.refetch());
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // MUTATIONS

  const { mutateAsync: archiveEntry } = useArchiveMutation({
    queryKey: KEYS.services,
    mutationFn: servicesService.archiveOne,
  });

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
          edit: !disableWrite,
          archive: !disableWrite,
        }}
        onArchive={async (row) => await archiveEntry(row._id)}
        AddModal={AddOwnerServiceModal}
        EditModal={EditOwnerServiceModal}
      />
    </>
  );
};

export default OwnerServicesGrid;
