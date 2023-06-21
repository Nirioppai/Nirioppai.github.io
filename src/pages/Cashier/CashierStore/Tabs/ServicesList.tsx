import { FC, PropsWithChildren } from 'react';

import { useQueries } from 'react-query';
import { getRecoil } from 'recoil-nexus';

import { DynamicAgGrid } from '~/components';
import { cashierSelectedStore } from '~/configs';
import { KEYS } from '~/constants';
import { servicesService } from '~/services';

interface ServicesListProps {
  disableWrite?: boolean;
  handleServiceClick?: any;
}

const ServicesList: FC<PropsWithChildren<ServicesListProps>> = ({
  disableWrite,
  handleServiceClick,
}) => {
  const storeId = getRecoil(cashierSelectedStore);

  const queries = useQueries(
    // @ts-ignore
    storeId
      ? [
          {
            queryKey: [KEYS.services, storeId],
            queryFn: () => servicesService.getServicesInStore(storeId),
          },
        ]
      : []
  );

  // @ts-ignore
  const services = queries[0]?.data || [];

  // @ts-ignore
  const isLoading = queries.some((q) => q.isLoading);
  // @ts-ignore
  const isError = queries.some((q) => q.isError);

  return (
    <>
      <DynamicAgGrid
        searchBarWidth={'100%'}
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
              onClick: handleServiceClick,
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

export default ServicesList;
